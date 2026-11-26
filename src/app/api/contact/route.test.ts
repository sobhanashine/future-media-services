import { afterEach, describe, expect, it, vi } from "vitest";
import { contactEmailAddress, contactMessage } from "@/lib/contact-fields.mjs";
import { POST } from "./route";
import { POST as legacyPost } from "../callback/route";

const url = "http://127.0.0.1:3000/api/contact";
const enquiry = { email: "reader+web@Example.TEST", message: "Vorrei un preventivo.", locale: "it" };
function post(data: Record<string, string>, headers = {}) {
  return new Request(url, {method: "POST", headers: {Accept: "application/json", Origin: new URL(url).origin, ...headers}, body: new URLSearchParams(data)});
}
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("project enquiries", () => {
  it("preserves valid reply addresses and Unicode messages", () => {
    expect(contactEmailAddress(" reader+web@Example.TEST ")).toBe("reader+web@example.test");
    for (const email of ["123", "a@b..com", ".a@example.org", "a@example.test\r\nBcc: other@example.org", "a@-x.org"]) {
      expect(contactEmailAddress(email)).toBeNull();
    }
    expect(contactMessage("  سلام\r\nدربارهٔ سایت  ")).toBe("سلام\nدربارهٔ سایت");
    expect(contactMessage("  ")).toBeNull();
    expect(contactMessage("x".repeat(3001))).toBeNull();
  });
  it("rejects phone-only, cross-origin, honeypot, oversized and duplicate inputs before delivery", async () => {
    const send = vi.fn(); vi.stubGlobal("fetch", send);
    expect((await POST(post(enquiry, {Origin: "https://example.org"}))).status).toBe(403);
    for (const data of [{phone:"123"}, {...enquiry,phone:"123"}, {...enquiry,website:"filled"}, {...enquiry,email:"invalid"}, {...enquiry,message:""}, {...enquiry,message:"x".repeat(34000)}]) {
      expect((await POST(post(data as Record<string,string>))).status).toBe(400);
    }
    const duplicate = new URLSearchParams(enquiry); duplicate.append("email", "other@example.org");
    expect((await POST(new Request(url,{method:"POST",headers:{Origin:new URL(url).origin,Accept:"application/json"},body:duplicate}))).status).toBe(400);
    expect((await legacyPost(post({phone:"123"}))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("delivers only enquiry fields and returns to the matching contact page without exposing them", async () => {
    vi.stubEnv("FMS_CALLBACK_MAIL_URL","http://127.0.0.1:39481/callback");
    vi.stubEnv("FMS_CALLBACK_MAIL_TOKEN","test-auth-token");
    const send=vi.fn().mockResolvedValueOnce(Response.json({delivered:false}));
    vi.stubGlobal("fetch",send);
    expect((await POST(post(enquiry))).status).toBe(503);
    for (const locale of ["fa","en","it"]) {
      send.mockResolvedValueOnce(Response.json({delivered:true}));
      const response=await POST(post({...enquiry,locale,recipient:"elsewhere@example.test"}, {Accept:"text/html"}));
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe((locale==="fa"?"":"/"+locale)+"/contact#message-sent");
      expect(JSON.parse(send.mock.lastCall?.[1].body)).toEqual({...enquiry,email:"reader+web@example.test",locale});
    }
  });
});
