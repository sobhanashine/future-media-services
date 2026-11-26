import { normalizeCallbackPhone, type CallbackStatus } from "./callback";
import { localePath, type Locale } from "../content/locales";

const httpStatus = { sent: 200, invalid: 400, busy: 429, unavailable: 503 } as const;
const maxBytes = 2048;

function respond(request: Request, status: CallbackStatus, locale: Locale) {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex", ...(status === "busy" ? { "Retry-After": "60" } : {}) };
  if (request.headers.get("accept")?.includes("application/json")) {
    return Response.json({ status }, { status: httpStatus[status], headers });
  }
  return new Response(null, { status: 303, headers: {
    ...headers, Location: localePath(locale, "/contact") + "#callback-" + status,
  } });
}

async function readForm(request: Request) {
  if (!request.body || Number(request.headers.get("content-length")) > maxBytes) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return new URLSearchParams(text + decoder.decode());
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}


type Deliver = (phone: string, locale: Locale) => Promise<CallbackStatus>;

export async function handleCallback(request: Request, deliver: Deliver, allowAttempt?: () => Promise<boolean>) {
  const privateHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { ...privateHeaders, Allow: "POST" } });
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? "";
  // Next's loopback listener may use localhost internally for a browser at 127.0.0.1.
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const expectedOrigin = local && /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)
    ? url.protocol + "//" + host : url.origin;
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  if (site === "cross-site" || (origin ? origin !== expectedOrigin : site !== "same-origin")) {
    return new Response(null, { status: 403, headers: privateHeaders });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/x-www-form-urlencoded") {
    return new Response(null, { status: 415, headers: privateHeaders });
  }
  let locale: Locale = "fa";
  try {
    const form = await readForm(request);
    const requestedLocale = form?.get("locale");
    if (requestedLocale === "en" || requestedLocale === "it") locale = requestedLocale;
    if (allowAttempt && !await allowAttempt()) return respond(request, "busy", locale);
    const phone = normalizeCallbackPhone(form?.get("phone") ?? "", locale);
    if (!phone || form?.getAll("phone").length !== 1 || form.get("website")) return respond(request, "invalid", locale);
    return respond(request, await deliver(phone, locale), locale);
  } catch {
    return respond(request, "unavailable", locale);
  }
}
