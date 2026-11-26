import type { Locale } from "@/content/locales";

export function normalizeCallbackPhone(input: string, locale: Locale = "fa") {
  if (input.length > 40) return null;
  const digits = input.trim().replace(/[۰-۹٠-٩]/g, char => String(char.charCodeAt(0) % 16));
  let number = digits.replace(/[\s.()\-\u200e\u200f]/g, "");
  if (number.startsWith("00")) number = "+" + number.slice(2);
  else if (locale === "it" && !number.startsWith("+")) {
    if (!/^(?:0\d{5,10}|3\d{8,9})$/.test(number)) return null;
    number = "+39" + number;
  } else if (/^0[1-9]\d{9}$/.test(number)) number = "+98" + number.slice(1);
  else if (/^9\d{9}$/.test(number)) number = "+98" + number;
  else if (/^98[1-9]\d{9}$/.test(number)) number = "+" + number;
  if (number.startsWith("+98") && !/^\+98[1-9]\d{9}$/.test(number)) return null;
  return /^\+[1-9]\d{7,14}$/.test(number) ? number : null;
}

export const callbackCopy = {
  fa: {
    label: "شماره تماس شما", placeholder: "۰۹۱۲ ۱۲۳ ۴۵۶۷", hint: "برای شمارهٔ خارج از ایران، کد کشور را هم بنویسید.",
    submit: "ثبت درخواست تماس", sending: "در حال ارسال…", privacy: "حریم خصوصی",
    consent: "با ثبت شماره، از تیم FMS می‌خواهید دربارهٔ پروژه‌تان با شما تماس بگیرد.",
    sent: "درخواست شما به تیم FMS رسید. با همین شماره تماس می‌گیریم.",
    invalid: "شمارهٔ کامل را وارد کنید. برای شماره‌های خارج از ایران، کد کشور لازم است.",
    busy: "تعداد درخواست‌ها زیاد است. چند دقیقهٔ دیگر دوباره تلاش کنید.",
    unavailable: "ارسال ایمیل تأیید نشد. دوباره تلاش کنید یا مستقیم با FMS تماس بگیرید.",
  },
  en: {
    label: "Your phone number", placeholder: "+1 202 555 0100", hint: "For numbers outside Iran, include the country code.",
    submit: "Request a callback", sending: "Sending…", privacy: "Privacy",
    consent: "By submitting your number, you ask FMS to contact you about your project.",
    sent: "Your request reached FMS. We’ll call you at the number you provided.",
    invalid: "Enter a complete phone number. Include the country code for numbers outside Iran.",
    busy: "We’ve received several requests. Please try again in a few minutes.",
    unavailable: "We couldn’t confirm delivery. Try again or call FMS directly.",
  },
  it: {
    label: "Il tuo numero di telefono", placeholder: "+39 320 123 4567",
    hint: "Per i numeri italiani il +39 è facoltativo. Per gli altri Paesi inserisci il prefisso internazionale.",
    submit: "Richiedi una chiamata", sending: "Invio in corso…", privacy: "Privacy",
    consent: "Inviando il numero chiedi a FMS di contattarti per il tuo progetto.",
    sent: "FMS ha ricevuto la richiesta. Ti richiameremo al numero indicato.",
    invalid: "Inserisci un numero di telefono completo. Per i numeri esteri includi il prefisso internazionale.",
    busy: "Sono arrivate diverse richieste. Riprova tra qualche minuto.",
    unavailable: "Non è stato possibile confermare l’invio. Riprova oppure chiama direttamente lo studio.",
  },
} as const;

export type CallbackStatus = "sent" | "invalid" | "busy" | "unavailable";
