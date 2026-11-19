import { afterAll, beforeAll, expect, it } from "vitest";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

let dir, endpoint, mailer;
const token = "local-fixture-secret-that-is-only-for-testing";

beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), "fms-mail-test-"));
  const cli = join(dir, "fake-composio.mjs");
  await writeFile(cli, `#!/usr/bin/env node
import { appendFileSync } from "node:fs";
import { setTimeout } from "node:timers/promises";
let input = "";
for await (const chunk of process.stdin) input += chunk;
const data = JSON.parse(input);
const action = process.argv[3];
appendFileSync(process.env.FIXTURE_LOG, JSON.stringify({action, data}) + "\\n");
if (action === "GMAIL_FETCH_EMAILS") {
  console.log(JSON.stringify({successful:true,data:{messages:[{messageId:"found-id"}]}}));
} else if (action === "GMAIL_SEND_EMAIL") {
  await setTimeout(45);
  if (data.body.includes("+12025550142")) {
    console.log(JSON.stringify({successful:false,retry:"check-first"}));
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify({successful:true,data:{id:"sent-id"}}));
  }
} else { process.exitCode = 1; }
`, { mode: 0o700 });

  const portProbe = createServer();
  portProbe.listen(0, "127.0.0.1");
  await once(portProbe, "listening");
  const { port } = portProbe.address();
  await new Promise(resolve => portProbe.close(resolve));
  endpoint = `http://127.0.0.1:${port}/callback`;
  mailer = spawn(process.execPath, [fileURLToPath(new URL("./callback-mailer.mjs", import.meta.url))], {
    stdio: "ignore",
    env: { ...process.env, FMS_CALLBACK_STATE_DIR: dir, FMS_CALLBACK_MAIL_URL: endpoint,
      FMS_CALLBACK_MAIL_TOKEN: token, FMS_CALLBACK_RECIPIENT: "team@example.test",
      FMS_CALLBACK_GMAIL_ACCOUNT: "fixture", FMS_COMPOSIO_BIN: cli, FIXTURE_LOG: join(dir, "calls.jsonl") },
  });
  for (let i = 0; i < 60; i++) {
    if (await fetch(endpoint).then(r => r.status === 404, () => false)) return;
    await delay(30);
  }
  throw new Error("Callback mailer did not start");
});

afterAll(async () => {
  if (mailer && mailer.exitCode === null) {
    const exited = once(mailer, "exit");
    mailer.kill("SIGTERM");
    await exited;
  }
  if (dir) await rm(dir, {recursive:true, force:true});
});

async function submit(phone, locale) {
  const result = await fetch(endpoint, {
    method: "POST", headers: {Authorization: "Bearer " + token, "Content-Type": "application/json"},
    body: JSON.stringify({phone, locale}),
  });
  return result.status;
}

async function calls() {
  return (await readFile(join(dir, "calls.jsonl"), "utf8")).trim().split("\n").map(line => JSON.parse(line));
}

it("sends one branded HTML email for duplicate submissions, with a dialable number and Tehran time", async () => {
  expect(await Promise.all([submit("+989121234567", "fa"), submit("+989121234567", "fa")])).toEqual([200, 200]);
  expect(await submit("+989121234567", "fa")).toBe(200);
  const sent = (await calls()).filter(call => call.action === "GMAIL_SEND_EMAIL" && call.data.body.includes("+989121234567"));
  expect(sent).toHaveLength(1);
  expect(sent[0].data).toMatchObject({ recipient_email: "team@example.test", is_html: true, include_signature: false });
  const { subject, body } = sent[0].data;
  expect(subject).toContain("درخواست تماس جدید");
  expect(subject).not.toContain("912");
  expect(body).toContain('lang="fa" dir="rtl"');
  expect(body.match(/href="tel:\+989121234567"/g)).toHaveLength(2);
  expect(body).toContain("+98 912 123 4567");
  expect(body).toContain("زمان ثبت (تهران)");
});

it("checks the reference in the email before acknowledging an interrupted send", async () => {
  expect(await submit("+12025550142", "en")).toBe(503);
  expect(await submit("+12025550142", "en")).toBe(200);
  const entries = await calls();
  const sends = entries.filter(e => e.action === "GMAIL_SEND_EMAIL" && e.data.body.includes("+12025550142"));
  expect(sends).toHaveLength(1);
  expect(sends[0].data.body).toContain("انگلیسی");
  const lookup = entries.find(e => e.action === "GMAIL_FETCH_EMAILS");
  expect(lookup.data).toMatchObject({ max_results: 1, ids_only: true, include_payload: false });
  const reference = lookup.data.query.match(/"([A-F0-9]{16})"/)[1];
  expect(sends[0].data.body).toContain(reference);
});
