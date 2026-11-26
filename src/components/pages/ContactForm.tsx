"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { localePath, type Locale } from "@/content/locales";
import { contactCopy, type ContactStatus } from "@/lib/contact";
import { contactEmailAddress, contactMessage, maxEmailLength, maxMessageLength } from "@/lib/contact-fields.mjs";
import s from "./ContactForm.module.css";

export function ContactForm({ locale, showRedirectStatus = false }: { locale: Locale; showRedirectStatus?: boolean }) {
  const t = contactCopy[locale];
  const [status, setStatus] = useState<ContactStatus | "sending" | null>(null);
  const [invalid, setInvalid] = useState<"email" | "message" | null>(null);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = !contactEmailAddress(data.get("email")) ? "email" : !contactMessage(data.get("message")) ? "message" : null;
    if (field) {
      setInvalid(field);
      setStatus("invalid");
      form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setInvalid(null);
    setStatus("sending");
    try {
      const response = await fetch(form.action, {
        method: "POST", headers: { Accept: "application/json" },
        body: new URLSearchParams(Array.from(data, ([key, value]) => [key, String(value)])),
      });
      const result = await response.json();
      if (response.ok && result.status === "sent") {
        form.reset();
        setStatus("sent");
      } else {
        setStatus(result.status === "busy" || result.status === "invalid" ? result.status : "unavailable");
      }
    } catch {
      setStatus("unavailable");
    } finally {
      submitting.current = false;
    }
  }

  function clearFeedback() {
    if (status !== "sending") { setInvalid(null); setStatus(null); }
  }

  return <form className={s.form} action="/api/contact" method="post" onSubmit={submit} onChange={clearFeedback}>
    <input type="hidden" name="locale" value={locale} />
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className={s.label} htmlFor="contact-email">{t.email}</label>
    <input className={s.field} id="contact-email" name="email" type="email" dir="ltr" autoComplete="email" required
      maxLength={maxEmailLength} readOnly={status === "sending"} aria-invalid={invalid === "email" || undefined} aria-describedby="message-status" />
    <label className={s.label} htmlFor="contact-message">{t.message}</label>
    <textarea className={s.field} id="contact-message" name="message" rows={4} dir="auto" required
      maxLength={maxMessageLength} readOnly={status === "sending"} aria-invalid={invalid === "message" || undefined} aria-describedby="message-status" />
    <p className={s.consent}>{t.consent} <Link href={localePath(locale, "/privacy")}>{t.privacy}</Link></p>
    <button type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit}</button>
    <p id="message-status" className={s.status} role="status" data-state={status}>{status && status !== "sending" ? t[status] : ""}</p>
    {showRedirectStatus && (["sent", "invalid", "busy", "unavailable"] as const).map(key => (
      <p key={key} id={"message-" + key} className={s.redirect} data-state={key}>{t[key]}</p>
    ))}
  </form>;
}
