import { notFoundResponse } from "./src/lib/not-found-response";
import type { Locale } from "./src/content/locales";
import { cloudContact, clearExpiredReceipts, type CallbackBindings } from "./worker/callback";

interface AssetsBinding {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface CloudflareEnv extends CallbackBindings {
  ASSETS: AssetsBinding;
}

interface WorkerExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const PRERENDER_ASSET_PREFIX = "/__opennext_prerender";

function protectResponse(response: Response, request: Request) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Content-Security-Policy", "base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'");
  const url = new URL(request.url);
  if (url.protocol === "https:") headers.set("Strict-Transport-Security", "max-age=31536000");
  if (url.hostname.endsWith(".workers.dev")) headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export function getCanonicalRedirectResponse(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  const url = new URL(request.url);
  const isPersianLocaleAlias = url.pathname === "/fa" || url.pathname.startsWith("/fa/");
  const shouldUseHttps = url.protocol === "http:";
  const shouldRemoveTrailingSlash =
    !isPersianLocaleAlias &&
    !url.pathname.includes(".") &&
    url.pathname.length > 1 &&
    url.pathname.endsWith("/");

  if (!shouldUseHttps && !shouldRemoveTrailingSlash) return null;

  const canonicalUrl = new URL(url);
  canonicalUrl.protocol = "https:";
  if (shouldRemoveTrailingSlash) {
    canonicalUrl.pathname = canonicalUrl.pathname.replace(/\/+$/, "") || "/";
  }

  return new Response(null, {
    status: 308,
    headers: { location: canonicalUrl.toString() },
  });
}

function getPrerenderRoute(pathname: string): { locale: Locale; route: string } {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments[0] === "en" || segments[0] === "it") {
    return { locale: segments[0], route: segments.join("/") };
  }

  return { locale: "fa", route: segments.join("/") || "index" };
}

function isRscRequest(request: Request): boolean {
  return (
    request.headers.get("rsc") === "1" ||
    request.headers.get("accept")?.includes("text/x-component") === true
  );
}

function withPageHeaders(
  assetResponse: Response,
  locale: Locale,
  rsc: boolean,
): Response {
  const headers = new Headers(assetResponse.headers);
  headers.set("cache-control", "public, max-age=0, must-revalidate");
  headers.delete("x-robots-tag");
  headers.set("set-cookie", `NEXT_LOCALE=${locale}; Path=/; Secure; SameSite=Lax`);
  headers.set(
    "vary",
    "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, accept-encoding",
  );

  if (rsc) {
    headers.set("content-type", "text/x-component");
  } else {
    headers.set("content-type", "text/html; charset=utf-8");
  }

  return new Response(assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });
}

async function getStaticAssetResponse(
  request: Request,
  env: CloudflareEnv,
): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  const { pathname } = new URL(request.url);
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/cdn-cgi/") ||
    !pathname.includes(".")
  ) {
    return null;
  }

  const assetResponse = await env.ASSETS.fetch(request);
  return assetResponse.ok ? assetResponse : null;
}

async function getPrerenderedResponse(
  request: Request,
  env: CloudflareEnv,
): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  const url = new URL(request.url);
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/cdn-cgi/") ||
    url.pathname.includes(".")
  ) {
    return null;
  }

  if (url.pathname === "/fa" || url.pathname.startsWith("/fa/")) {
    const targetPath = url.pathname.replace(/^\/fa(?=\/|$)/, "") || "/";
    const headers = new Headers({ location: `${targetPath}${url.search}` });
    headers.append("set-cookie", "NEXT_LOCALE=fa; Path=/; Secure; SameSite=Lax");
    return new Response(null, { status: 307, headers });
  }

  const { locale, route } = getPrerenderRoute(url.pathname);
  const rsc = isRscRequest(request);
  const assetUrl = new URL(
    `${PRERENDER_ASSET_PREFIX}/${route}.${rsc ? "rsc" : "html"}`,
    request.url,
  );
  const assetResponse = await env.ASSETS.fetch(
    new Request(assetUrl, { method: request.method }),
  );

  if (!assetResponse.ok) {
    await assetResponse.body?.cancel();
    return null;
  }

  return withPageHeaders(assetResponse, locale, rsc);
}

async function runOpenNext(
  request: Request,
  env: CloudflareEnv,
  ctx: WorkerExecutionContext,
): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore The generated OpenNext worker is created by the Cloudflare build.
  const { default: openNextWorker } = await import("./.open-next/worker.js");
  return openNextWorker.fetch(request, env, ctx);
}

const cloudflareWorker = {
  async scheduled(_event: unknown, env: CloudflareEnv) {
    await clearExpiredReceipts(env);
  },
  async fetch(
    request: Request,
    env: CloudflareEnv,
    ctx: WorkerExecutionContext,
  ): Promise<Response> {
    const path = new URL(request.url).pathname;
    if (/^\/api\/(?:contact|callback)\/?$/.test(path)) return protectResponse(await cloudContact(request, env), request);
    if (path.startsWith(PRERENDER_ASSET_PREFIX + "/")) {
      return protectResponse(new Response(null, { status: 404, headers: { "X-Robots-Tag": "noindex" } }), request);
    }
    const response = getCanonicalRedirectResponse(request)
      ?? await getStaticAssetResponse(request, env)
      ?? await getPrerenderedResponse(request, env)
      ?? await runOpenNext(request, env, ctx);
    const { locale } = getPrerenderRoute(path);
    if (response.status === 404 && locale !== "fa" && !isRscRequest(request) &&
        !path.includes(".") && (request.method === "GET" || request.method === "HEAD")) {
      await response.body?.cancel();
      return protectResponse(notFoundResponse(locale, request.method), request);
    }
    return protectResponse(response, request);
  },
};

export default cloudflareWorker;
