"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { callbackCopy, normalizeCallbackPhone, type CallbackStatus } from "@/lib/callback";
import { localePath, type Locale } from "@/content/locales";
import s from "./CallbackForm.module.css";

export function CallbackForm({ locale, showRedirectStatus = false }: { locale: Locale; showRedirectStatus?: boolean }) {
  const t = callbackCopy[locale];
  const [status, setStatus] = useState<CallbackStatus | "sending" | null>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!normalizeCallbackPhone(String(data.get("phone") ?? ""), locale)) {
      setStatus("invalid");
      phoneInput.current?.focus();
      return;
    }
    submitting.current = true;
    setStatus("sending");
    try {
      const response = await fetch(form.action, {
        method: "POST", headers: { Accept: "application/json" },
        body: new URLSearchParams(Array.from(data, ([key, value]) => [key, String(value)])),
      });
      const result = await response.json();
      if (response.ok && result.status === "sent") {
        setStatus("sent");
        form.reset();
      } else {
        setStatus(result.status === "busy" || result.status === "invalid" ? result.status : "unavailable");
      }
    } catch {
      setStatus("unavailable");
    } finally {
      submitting.current = false;
    }
  }

  return <form className={s.form} action="/api/callback" method="post" onSubmit={submit}>
    <input type="hidden" name="locale" value={locale} />
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className={s.label} htmlFor="callback-phone">{t.label}</label>
    <div className={s.controls}>
      <input ref={phoneInput} type="tel" inputMode="tel" dir="ltr" name="phone" id="callback-phone" required maxLength={40}
        autoComplete="tel" placeholder={t.placeholder} readOnly={status === "sending"} aria-invalid={status === "invalid" || undefined}
        aria-describedby="callback-help callback-status" onChange={() => { if (status) setStatus(null); }} />
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit}</button>
    </div>
    <span className={s.help} id="callback-help">{t.hint}</span>
    <p className={s.consent}>{t.consent} <Link href={localePath(locale, "/privacy")}>{t.privacy}</Link></p>
    <p id="callback-status" className={s.status} role="status" data-state={status}>{status && status !== "sending" ? t[status] : ""}</p>
    {showRedirectStatus && (["sent", "invalid", "busy", "unavailable"] as const).map(key => (
      <p key={key} id={"callback-" + key} className={s.redirect} data-state={key}>{t[key]}</p>
    ))}
  </form>;
}
