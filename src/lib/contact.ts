export const contactLabel = { fa: "ارسال ایمیل", en: "Email us", it: "Scrivici" } as const;

export type ContactStatus = "sent" | "invalid" | "busy" | "unavailable";

export const contactCopy = {
  fa: {
    email: "ایمیل شما", message: "پیام شما", submit: "ارسال پیام", sending: "در حال ارسال…",
    consent: "از ایمیل شما برای پاسخ به همین پیام استفاده می‌کنیم.", privacy: "حریم خصوصی",
    sent: "پیامتان به تیم FMS رسید. پاسخ را به ایمیلی که وارد کردید می‌فرستیم.",
    invalid: "یک ایمیل معتبر و متن پیام را وارد کنید.",
    busy: "تعداد پیام‌ها زیاد است. چند دقیقهٔ دیگر دوباره تلاش کنید.",
    unavailable: "ارسال پیام تأیید نشد. لطفاً کمی بعد دوباره تلاش کنید.",
  },
  en: {
    email: "Your email", message: "Your message", submit: "Send message", sending: "Sending…",
    consent: "We’ll use your email address to reply to this message.", privacy: "Privacy",
    sent: "Your message reached FMS. We’ll reply to the email address you entered.",
    invalid: "Enter a valid email address and a message.",
    busy: "We’ve received several messages. Please try again in a few minutes.",
    unavailable: "We couldn’t confirm that your message was sent. Please try again later.",
  },
  it: {
    email: "La tua email", message: "Il tuo messaggio", submit: "Invia il messaggio", sending: "Invio in corso…",
    consent: "Useremo il tuo indirizzo email per rispondere a questo messaggio.", privacy: "Privacy",
    sent: "FMS ha ricevuto il tuo messaggio. Ti risponderemo all’indirizzo email che hai indicato.",
    invalid: "Inserisci un indirizzo email valido e un messaggio.",
    busy: "Sono arrivati diversi messaggi. Riprova tra qualche minuto.",
    unavailable: "Non abbiamo potuto confermare l’invio del messaggio. Riprova tra poco.",
  },
} as const;
