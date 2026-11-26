import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cloudCallback, clearExpiredReceipts } from "../worker/callback";

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
  function post(phone, ip = "192.0.2.7", locale = "fa") {
    return cloudCallback(new Request("https://example.test/api/callback", {
      method: "POST", headers: { Accept: "application/json", Origin: "https://example.test", "CF-Connecting-IP": ip },
      body: new URLSearchParams({ phone, locale }),
    }), env);
  }
  return { send, post, env };
}

it("delivers the HTML from the public form once and stores only keyed identifiers", async () => {
  const { post, send } = setup();
  await Promise.all([post("+1 202 555 0146"), post("+1 202 555 0146")]);
  expect((await post("+۱۲۰۲۵۵۵۰۱۴۶")).status).toBe(200);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: "team@example.test", html: expect.stringContaining('href="tel:+12025550146"') }));
  const [row] = db.prepare("SELECT * FROM callback_receipts").all();
  expect(row.phone_key).toMatch(/^[a-f0-9]{64}$/);
  expect(row.client_key).toMatch(/^[a-f0-9]{64}$/);
  expect(row.state).toBe("sent");
});

it("marks an Italian callback for the receiving team and keeps the landline prefix", async () => {
  const { post, send } = setup();
  expect((await post("02 0000 0000", "192.0.2.7", "it")).status).toBe(200);
  const message = send.mock.calls[0][0];
  expect(message.html).toContain('href="tel:+390200000000"');
  expect(message.html).toContain("ایتالیایی");
});

it("enforces the network and shared hourly budgets on separate submissions", async () => {
  const { post, send } = setup();
  const now = Date.now();
  const clock = vi.spyOn(Date, "now").mockReturnValue(now);
  for (let n = 0; n < 3; n++) {
    expect((await post("+1202555010" + n, "2001:db8:aa:1::" + n)).status).toBe(200);
  }
  const limited = await post("+12025550109", "2001:db8:aa:1::9");
  expect(limited.status).toBe(429);
  expect(limited.headers.get("Retry-After")).toBeTruthy();
  for (let i = 0; i < 57; i++) {
    clock.mockReturnValue(now + (1 + Math.floor(i / 10)) * 61_000);
    expect((await post("+1202555" + (120 + i).toString().padStart(4, "0"), "192.0.2." + i)).status).toBe(200);
  }
  expect((await post("+12025550199", "192.0.2.250")).status).toBe(429);
  expect(send).toHaveBeenCalledTimes(60);
});

it("fails closed on edge limits and ambiguous email delivery, and expires old receipts", async () => {
  const { env, post, send } = setup(vi.fn(async () => { throw new Error("fixture interruption"); }));
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.mocked(env.CALLBACK_LIMIT.limit).mockResolvedValueOnce({ success: false });
  expect((await post("+12025550143")).status).toBe(429);
  expect(send).not.toHaveBeenCalled();
  expect((await post("+12025550143")).status).toBe(503);
  expect((await post("+12025550143")).status).toBe(429);
  expect(send).toHaveBeenCalledTimes(1);
  vi.spyOn(Date, "now").mockReturnValue(Date.now() + 86_400_001);
  await clearExpiredReceipts(env);
  expect(db.prepare("SELECT COUNT(*) AS n FROM callback_receipts").get()?.n).toBe(0);
});
