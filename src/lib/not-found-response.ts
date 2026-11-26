import type { InternationalLocale } from "../content/locales";

const words = {
  en: { title: "Page not found", detail: "This address may have changed. Choose a page to continue.", home: "FMS home", work: "View our work" },
  it: { title: "Pagina non trovata", detail: "L’indirizzo potrebbe essere cambiato. Scegli una pagina per continuare.", home: "Home di FMS", work: "Guarda i progetti" },
};

export function notFoundResponse(locale: InternationalLocale, method: string) {
  const t = words[locale];
  const html = `<!doctype html><html lang="${locale}" dir="ltr"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
    <title>${t.title} | Future Media Services</title>
    <style>
      *{box-sizing:border-box}body{margin:0;background:#0b0a0c;color:#fafafa;font:1rem/1.6 system-ui,sans-serif}
      main{min-height:100svh;max-width:40rem;margin:auto;padding:2rem;display:flex;flex-direction:column;align-items:flex-start;justify-content:center}
      small{color:#ff8599}h1{font-size:clamp(2rem,7vw,4rem);line-height:1.1;margin:.5rem 0}p{color:#cec7cb}
      nav{display:flex;flex-wrap:wrap;gap:1.25rem}a{color:#fff;padding:.6rem 0;text-underline-offset:.3em}
    </style></head><body><main><small>Future Media Services · 404</small>
    <h1>${t.title}</h1><p>${t.detail}</p><nav><a href="/${locale}">${t.home}</a><a href="/${locale}/work">${t.work}</a></nav>
    </main></body></html>`;
  return new Response(method === "HEAD" ? null : html, {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
