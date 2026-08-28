import { describe, expect, it } from "vitest";
import { getCanonicalRedirectResponse } from "../cloudflare-worker";

describe("Cloudflare canonical URL redirects", () => {
  it("upgrades HTTP and removes a trailing slash in one redirect", () => {
    const response = getCanonicalRedirectResponse(
      new Request("http://futuremservices.ir/blog/?utm_source=search"),
    );

    expect(response?.status).toBe(308);
    expect(response?.headers.get("location")).toBe(
      "https://futuremservices.ir/blog?utm_source=search",
    );
  });

  it("leaves the canonical HTTPS URL unchanged", () => {
    const response = getCanonicalRedirectResponse(new Request("https://futuremservices.ir/blog"));

    expect(response).toBeNull();
  });

  it("preserves the existing Persian locale alias behavior", () => {
    const response = getCanonicalRedirectResponse(new Request("https://futuremservices.ir/fa/"));

    expect(response).toBeNull();
  });
});
