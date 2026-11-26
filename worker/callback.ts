import { contactNotification } from "../scripts/callback-email.mjs";
import { handleContact, type Enquiry } from "../src/lib/contact-request";
import type { ContactStatus } from "../src/lib/contact";

interface Statement {
  bind(...values: (string | number)[]): Statement;
  run(): Promise<unknown>;
}
interface Receipt { reference: string; state: "pending" | "sent"; created_at: number }
export interface CallbackBindings {
  CALLBACK_DB: { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<{ results: Receipt[] }[]> };
  CALLBACK_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
  CALLBACK_EMAIL: { send(message: { to: string; from: { email: string; name: string }; subject: string; html: string; text: string; replyTo: string }): Promise<unknown> };
  FMS_CALLBACK_HASH_KEY: string;
  FMS_CALLBACK_RECIPIENT: string;
}

const minute = 60_000;
const day = 1440 * minute;
const prune = "DELETE FROM callback_receipts WHERE created_at <= ?";
const reserve = `
  INSERT INTO callback_receipts (reference, phone_key, client_key, created_at, state)
  SELECT ?, ?, ?, ?, 'pending'
  WHERE NOT EXISTS (
    SELECT 1 FROM callback_receipts WHERE phone_key = ? AND (state = 'pending' OR created_at > ?)
  )
  AND (SELECT COUNT(*) FROM callback_receipts WHERE client_key = ? AND created_at > ?) < 3
  AND (SELECT COUNT(*) FROM callback_receipts WHERE created_at > ?) < 12
  AND (SELECT COUNT(*) FROM callback_receipts WHERE created_at > ?) < 60`;
const recent = "SELECT reference, state, created_at FROM callback_receipts WHERE phone_key = ? ORDER BY created_at DESC LIMIT 1";

export function clearExpiredReceipts(env: CallbackBindings) {
  return env.CALLBACK_DB.prepare(prune).bind(Date.now() - day).run();
}

function clientNetwork(ip: string) {
  if (!ip.includes(":")) return ip;
  const [left, right = ""] = ip.toLowerCase().split("::");
  const prefix = left ? left.split(":") : [];
  const suffix = right ? right.split(":") : [];
  return [...prefix, ...Array(Math.max(0, 8 - prefix.length - suffix.length)).fill("0"), ...suffix]
    .slice(0, 4).map(part => Number.parseInt(part, 16).toString(16)).join(":") + "::/64";
}

async function digest(key: CryptoKey, value: string) {
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(mac), b => b.toString(16).padStart(2, "0")).join("");
}

async function deliver(env: CallbackBindings, key: CryptoKey, clientKey: string, enquiry: Enquiry): Promise<ContactStatus> {
  if (!env.FMS_CALLBACK_RECIPIENT || !env.CALLBACK_EMAIL) return "unavailable";
  // The existing phone_key column stores only a keyed receipt digest, including for earlier deployments.
  const enquiryKey = await digest(key, JSON.stringify(["email", enquiry.email, enquiry.message, enquiry.locale]));
  const now = Date.now();
  const cutoff = now - 15 * minute;
  const reference = crypto.randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase();
  const db = env.CALLBACK_DB;
  // D1 executes the batch in a single transaction on the primary. Only its reservation owner sends.
  const [, , lookup] = await db.batch([
    db.prepare(prune).bind(now - day),
    db.prepare(reserve).bind(reference, enquiryKey, clientKey, now, enquiryKey, cutoff, clientKey, now - 10 * minute, now - minute, now - 60 * minute),
    db.prepare(recent).bind(enquiryKey),
  ]);
  const receipt = lookup.results[0];
  if (receipt?.reference !== reference) {
    return receipt?.state === "sent" && receipt.created_at > cutoff ? "sent" : "busy";
  }
  const { subject, html, text } = contactNotification({ ...enquiry, created: now, reference, subjectPrefix: "" });
  try {
    await env.CALLBACK_EMAIL.send({
      from: { name: "Future Media Services", email: "callbacks@notify.futuremservices.ir" },
      to: env.FMS_CALLBACK_RECIPIENT, replyTo: enquiry.email, subject, html, text,
    });
  } catch (error) {
    // An ambiguous provider response must never start a second delivery for this reservation.
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    console.error("Contact email unconfirmed", reference, /^E_[A-Z_]+$/.test(code) ? code : "UNCONFIRMED");
    return "unavailable";
  }
  await db.prepare("UPDATE callback_receipts SET state = 'sent' WHERE reference = ?").bind(reference).run();
  return "sent";
}

export function cloudContact(request: Request, env: CallbackBindings) {
  let key: CryptoKey;
  let clientKey: string;
  return handleContact(request, enquiry => deliver(env, key, clientKey, enquiry), async () => {
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip || !env.FMS_CALLBACK_HASH_KEY || env.FMS_CALLBACK_HASH_KEY.length < 32) throw new Error("Missing callback configuration");
    key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.FMS_CALLBACK_HASH_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    clientKey = await digest(key, "network:" + clientNetwork(ip));
    return (await env.CALLBACK_LIMIT.limit({ key: clientKey })).success;
  });
}
