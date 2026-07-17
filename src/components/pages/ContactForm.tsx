"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/actions/contact";
import { copy, type Locale } from "@/content/site";

const labels = {
  fa: {
    fullName: "نام و نام خانوادگی",
    business: "نام کسب‌وکار (اختیاری)",
    contact: "ایمیل، شماره یا آیدی تماس",
    service: "نوع خدمت",
    budget: "بازه بودجه (اختیاری)",
    timeline: "زمان مورد انتظار (اختیاری)",
    project: "درباره پروژه، مسئله و هدف بنویسید",
    privacy: "با پردازش اطلاعاتم برای پاسخ‌گویی به این درخواست موافقم.",
    submit: "ارسال درخواست",
    pending: "در حال بررسی…",
    choose: "یک خدمت را انتخاب کنید",
  },
  en: {
    fullName: "Full name",
    business: "Business name (optional)",
    contact: "Email, phone or contact handle",
    service: "Service",
    budget: "Budget range (optional)",
    timeline: "Expected timing (optional)",
    project: "Tell us about the project, problem and goal",
    privacy: "I agree to the use of my information to respond to this enquiry.",
    submit: "Send enquiry",
    pending: "Checking…",
    choose: "Choose a service",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const initialState: ContactState = { status: "idle", message: "" };
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const text = labels[locale];
  const content = copy[locale];
  const hasError = (field: string) => Boolean(state.errors?.[field]?.length);

  return (
    <form action={formAction} className="contact-form" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-row">
        <label>
          <span>{text.fullName} *</span>
          <input name="fullName" autoComplete="name" required aria-invalid={hasError("fullName")} />
        </label>
        <label>
          <span>{text.business}</span>
          <input name="business" autoComplete="organization" aria-invalid={hasError("business")} />
        </label>
      </div>
      <div className="field-row">
        <label>
          <span>{text.contact} *</span>
          <input name="contact" autoComplete="email" required aria-invalid={hasError("contact")} />
        </label>
        <label>
          <span>{text.service} *</span>
          <select name="service" defaultValue="" required aria-invalid={hasError("service")}>
            <option value="" disabled>{text.choose}</option>
            {content.services.map((service) => (
              <option key={service.slug} value={service.slug}>{service.title}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="field-row">
        <label>
          <span>{text.budget}</span>
          <input name="budget" inputMode="text" aria-invalid={hasError("budget")} />
        </label>
        <label>
          <span>{text.timeline}</span>
          <input name="timeline" aria-invalid={hasError("timeline")} />
        </label>
      </div>
      <label>
        <span>{text.project} *</span>
        <textarea name="project" rows={6} minLength={20} required aria-invalid={hasError("project")} />
      </label>
      <label className="consent-field">
        <input type="checkbox" name="privacy" required aria-invalid={hasError("privacy")} />
        <span>{text.privacy}</span>
      </label>
      <div className="form-submit">
        <button type="submit" className="button" disabled={pending}>
          {pending ? text.pending : text.submit}
          <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status form-status--${state.status}`} aria-live="polite">
          {state.message}
        </p>
      </div>
    </form>
  );
}
