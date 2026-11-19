import { afterEach, describe, expect, it, vi } from "vitest";
import { normalizeCallbackPhone } from "@/lib/callback";
import { POST } from "./route";

const url = "http://127.0.0.1:3000/api/callback";
function submit(data: Record<string, string>, headers = {}) {
  return POST(new Request(url, { method: "POST", headers: { Accept: "application/json", Origin: new URL(url).origin, ...headers }, body: new URLSearchParams(data) }));
}

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("callback delivery", () => {
  it("accepts Persian, Arabic and international numbers", () => {
    for (const number of ["۰۹۱۲ ۳۴۵ ۶۷۸۹", "+۹۸ (۹۱۲) ۳۴۵ ۶۷۸۹", "۰۰۹۸۹۱۲۳۴۵۶۷۸۹", "٩١٢٣٤٥٦٧٨٩"]) {
      expect(normalizeCallbackPhone(number)).toBe("+989123456789");
    }
    expect(normalizeCallbackPhone("+1 (202) 555-0146")).toBe("+12025550146");
    for (const invalid of ["+98", "foo۰۹۱۲۳۴۵۶۷۸۹", "0912", "+9809123456789", "+12555555555555555"]) {
      expect(normalizeCallbackPhone(invalid)).toBeNull();
    }
  });
  it("rejects another origin and invalid or oversized inputs before delivery", async () => {
    const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
    expect((await submit({ phone: "+12025550146" }, { Origin: "https://example.org" })).status).toBe(403);
    for (const data of [{ phone: "12" }, { phone: "+12025550146", website: "filled" }, { phone: "0".repeat(3000) }]) {
      expect((await submit(data as Record<string,string>)).status).toBe(400);
    }
    expect(fetch).not.toHaveBeenCalled();
  });
  it("only acknowledges a confirmed email and keeps phone numbers out of redirects", async () => {
    vi.stubEnv("FMS_CALLBACK_MAIL_URL", "http://127.0.0.1:39481/callback");
    vi.stubEnv("FMS_CALLBACK_MAIL_TOKEN", "test-auth-token");
    const send = vi.fn().mockResolvedValueOnce(Response.json({ delivered: false })).mockResolvedValueOnce(Response.json({ delivered: true }));
    vi.stubGlobal("fetch", send);
    expect((await submit({ phone: "۰۹۱۲۳۴۵۶۷۸۹" })).status).toBe(503);
    const response = await submit({ locale: "en", phone: "۰۹۱۲۳۴۵۶۷۸۹", recipient: "ignored@example.org" }, { Accept: "text/html" });
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("/en/contact#callback-sent");
    expect(JSON.parse(send.mock.calls[1][1].body)).toEqual({ phone: "+989123456789", locale: "en" });
  });
});
