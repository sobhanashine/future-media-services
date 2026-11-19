import { handleCallback } from "@/lib/callback-request";

export async function POST(request: Request) {
  return handleCallback(request, async (phone, locale) => {
    // The public Cloudflare entry point handles this route with native bindings.
    const endpoint = process.env.FMS_CALLBACK_MAIL_URL;
    const token = process.env.FMS_CALLBACK_MAIL_TOKEN;
    if (!endpoint || !token) return "unavailable";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ phone, locale }),
      signal: AbortSignal.timeout(50_000),
      cache: "no-store",
      redirect: "error",
    });
    if (res.status === 429) return "busy";
    return res.ok && (await res.json()).delivered === true ? "sent" : "unavailable";
  });
}
