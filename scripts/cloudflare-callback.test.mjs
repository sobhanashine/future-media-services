import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cloudContact, clearExpiredReceipts } from "../worker/callback";

let db;
beforeEach(() => {
  db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../migrations/0001_callback_receipts.sql", import.meta.url), "utf8"));
});
afterEach(() => { db.close(); vi.restoreAllMocks(); });

class LocalStatement {
  values = [];
  constructor(sql) { this.sql = sql; }
  bind(...values) { this.values = values; return this; }
  async run() { return db.prepare(this.sql).run(...this.values); }
}

function setup(send = vi.fn(async () => ({ messageId: "fixture" }))) {
  const env = {
    CALLBACK_DB: {
      prepare: sql => new LocalStatement(sql),
      async batch(statements) {
        db.exec("BEGIN");
        try {
          const results = statements.map(({ sql, values }) => ({
            results: db.prepare(sql).all(...values),
          }));
          db.exec("COMMIT");
          return results;
        } catch (error) { db.exec("ROLLBACK"); throw error; }
      },
    },
    CALLBACK_LIMIT: { limit: vi.fn(async () => ({ success: true })) },
    CALLBACK_EMAIL: { send }, FMS_CALLBACK_HASH_KEY: "for-automated-tests-only-000000000000", FMS_CALLBACK_RECIPIENT: "team@example.test",
  };
  function post(message, ip = "192.0.2.7", locale = "fa", email = "customer@example.test") {
    return cloudContact(new Request("https://example.test/api/contact", {
      method: "POST", headers: { Accept: "application/json", Origin: "https://example.test", "CF-Connecting-IP": ip },
      body: new URLSearchParams({ email, message, locale }),
    }), env);
  }
  return { send, post, env };
}

it("delivers the HTML from the public form once and stores only keyed identifiers", async () => {
  const { post, send } = setup();
  await Promise.all([post("درخواست طراحی سایت"), post("درخواست طراحی سایت")]);
  expect((await post("درخواست طراحی سایت")).status).toBe(200);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: "team@example.test", replyTo: "customer@example.test", text: expect.stringContaining("درخواست طراحی سایت") }));
  const [row] = db.prepare("SELECT * FROM callback_receipts").all();
  expect(row.phone_key).toMatch(/^[a-f0-9]{64}$/);
  expect(row.client_key).toMatch(/^[a-f0-9]{64}$/);
  expect(row.state).toBe("sent");
});

it("keeps different messages from the same person and escapes their text in every language", async () => {
  const { post, send } = setup();
  for (const [locale, label] of [["fa", "فارسی"], ["en", "انگلیسی"], ["it", "ایتالیایی"]]) {
    const content = "Project <details> & " + locale;
    expect((await post(content, "192.0.2.7", locale)).status).toBe(200);
    const email = send.mock.lastCall[0];
    expect(email.html).toContain("&lt;details&gt; &amp;");
    expect(email.html).toContain('href="mailto:customer@example.test"');
    expect(email.replyTo).toBe("customer@example.test");
    expect(email.subject).toContain(label);
    expect(email.text).toContain(content);
  }
});

it("enforces the network and shared hourly budgets on separate submissions", async () => {
  const { post, send } = setup();
  const now = Date.now();
  const clock = vi.spyOn(Date, "now").mockReturnValue(now);
  for (let n = 0; n < 3; n++) {
    expect((await post("project number " + n, "2001:db8:aa:1::" + n)).status).toBe(200);
  }
  const limited = await post("later project", "2001:db8:aa:1::9");
  expect(limited.status).toBe(429);
  expect(limited.headers.get("Retry-After")).toBeTruthy();
  for (let i = 0; i < 57; i++) {
    clock.mockReturnValue(now + (1 + Math.floor(i / 10)) * 61_000);
    expect((await post("project brief " + (120 + i).toString().padStart(4, "0"), "192.0.2." + i)).status).toBe(200);
  }
  expect((await post("new brief", "192.0.2.250")).status).toBe(429);
  expect(send).toHaveBeenCalledTimes(60);
});

it("fails closed on edge limits and ambiguous email delivery, and expires old receipts", async () => {
  const { env, post, send } = setup(vi.fn(async () => { throw new Error("fixture interruption"); }));
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.mocked(env.CALLBACK_LIMIT.limit).mockResolvedValueOnce({ success: false });
  expect((await post("price enquiry")).status).toBe(429);
  expect(send).not.toHaveBeenCalled();
  expect((await post("price enquiry")).status).toBe(503);
  expect((await post("price enquiry")).status).toBe(429);
  expect(send).toHaveBeenCalledTimes(1);
  vi.spyOn(Date, "now").mockReturnValue(Date.now() + 86_400_001);
  await clearExpiredReceipts(env);
  expect(db.prepare("SELECT COUNT(*) AS n FROM callback_receipts").get()?.n).toBe(0);
});
