// Local mail transport for the FMS preview. The website only sees this endpoint and its token.
import { execFile } from "node:child_process";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdirSync, chmodSync } from "node:fs";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { contactNotification } from "./callback-email.mjs";
import { contactEmailAddress, contactMessage } from "../src/lib/contact-fields.mjs";

const token = process.env.FMS_CALLBACK_MAIL_TOKEN;
const recipient = process.env.FMS_CALLBACK_RECIPIENT;
const account = process.env.FMS_CALLBACK_GMAIL_ACCOUNT;
const subjectPrefix = process.env.FMS_CALLBACK_SUBJECT_PREFIX?.trim();
const cli = process.env.FMS_COMPOSIO_BIN || "composio";
const endpoint = new URL(process.env.FMS_CALLBACK_MAIL_URL || "http://127.0.0.1:39481/callback");
if (!token || token.length < 32 || !recipient || !account || endpoint.hostname !== "127.0.0.1" || endpoint.protocol !== "http:") {
  throw new Error("Configure the loopback mail URL, secret, Gmail account and recipient before starting the callback mailer.");
}
const folder = process.env.FMS_CALLBACK_STATE_DIR || join(homedir(), "Library", "Application Support", "Future Media Services", "callbacks");
mkdirSync(folder, { recursive: true, mode: 0o700 });
const filename = join(folder, "receipts.sqlite");
const db = new DatabaseSync(filename);
chmodSync(filename, 0o600);
db.exec("CREATE TABLE IF NOT EXISTS receipts (digest TEXT PRIMARY KEY, reference TEXT NOT NULL, status TEXT NOT NULL, created INTEGER NOT NULL, provider_id TEXT)");
const pending = new Map();
const minute = 60_000;

// Send data through stdin so contact details do not appear in the process list or server logs.
function runCli(args, data) {
  return new Promise((resolve) => {
    const child = execFile(cli, args, { encoding: "utf8", timeout: 35_000, maxBuffer: 512_000 }, (error, stdout) => {
      let result;
      try { result = JSON.parse(stdout); } catch { /* interrupted or non-JSON response */ }
      resolve({ result, code: error?.code ?? 0 });
    });
    child.stdin.on("error", () => {});
    child.stdin.end(data ? JSON.stringify(data) : undefined);
  });
}

async function deliveredReference(reference) {
  // The reference is in the HTML footer (or the subject on older receipts). Only fetch IDs.
  const { code, result } = await runCli(["execute", "GMAIL_FETCH_EMAILS", "--account", account, "-d", "-"], {
    query: `in:sent to:${recipient} "${reference}"`, max_results: 1, ids_only: true, include_payload: false,
  });
  if (code !== 0 || !result?.successful) return undefined;
  return result.data?.messages?.[0]?.messageId;
}

function confirm(digest, messageId) {
  db.prepare("UPDATE receipts SET status = 'sent', provider_id = ? WHERE digest = ?").run(messageId, digest);
  return 200;
}

async function deliver(enquiry, digest) {
  const now = Date.now();
  db.prepare("DELETE FROM receipts WHERE created < ?").run(now - 24 * 60 * minute);
  const prior = db.prepare("SELECT reference, status, created FROM receipts WHERE digest = ?").get(digest);
  if (prior?.status === "sent" && now - prior.created < 15 * minute) return 200;
  if (prior?.status === "pending") {
    const receipt = await deliveredReference(prior.reference);
    if (receipt) return confirm(digest, receipt);
    // An interrupted send could still reach Gmail. Do not send a second message blindly.
    return 503;
  }
  const volume = db.prepare("SELECT COUNT(*) AS count FROM receipts WHERE created >= ?").get(now - minute);
  if (volume.count >= 12) return 429;
  const reference = randomBytes(8).toString("hex").toUpperCase();
  db.prepare("INSERT OR REPLACE INTO receipts (digest, reference, status, created) VALUES (?, ?, 'pending', ?)").run(digest, reference, now);
  const { subject, html } = contactNotification({ ...enquiry, created: now, reference, subjectPrefix });
  const { code, result } = await runCli(["execute", "GMAIL_SEND_EMAIL", "--account", account, "-d", "-"], {
    recipient_email: recipient, subject, body: html, is_html: true, include_signature: false,
  });
  const id = result?.data?.id ?? result?.data?.message?.id;
  if (code === 0 && result?.successful === true && id) return confirm(digest, id);
  const safeRetry = code === 75 || code === "ENOENT" || result?.retry === "safe";
  if (safeRetry) db.prepare("DELETE FROM receipts WHERE digest = ?").run(digest);
  console.error("Callback mail delivery unconfirmed", reference);
  return 503;
}

function sendOnce(enquiry) {
  const digest = createHmac("sha256", token).update(JSON.stringify(["email", enquiry.email, enquiry.message, enquiry.locale])).digest("hex");
  const existing = pending.get(digest);
  if (existing) return existing;
  const task = deliver(enquiry, digest).finally(() => pending.delete(digest));
  pending.set(digest, task);
  return task;
}

const server = createServer(async (req, res) => {
  function reply(code) {
    res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify({ delivered: code === 200 }));
  }
  if (req.url !== endpoint.pathname || req.method !== "POST") return reply(404);
  const auth = Buffer.from(req.headers.authorization ?? "");
  const expected = Buffer.from("Bearer " + token);
  if (auth.length !== expected.length || !timingSafeEqual(auth, expected)) return reply(403);
  try {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 16 * 1024) return reply(413);
      chunks.push(chunk);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const email = contactEmailAddress(data?.email);
    const message = contactMessage(data?.message);
    const locale = data?.locale;
    if (!email || !message || !["fa", "en", "it"].includes(locale)) return reply(400);
    return reply(await sendOnce({ email, message, locale }));
  } catch {
    return reply(503);
  }
});
server.requestTimeout = 12_000;
server.listen(Number(endpoint.port), "127.0.0.1");
