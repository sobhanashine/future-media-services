const tehranDate = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "long", timeStyle: "short", timeZone: "Asia/Tehran",
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

export function contactNotification({ email, message, locale, created, reference, subjectPrefix }) {
  const language = { fa: "فارسی", en: "انگلیسی", it: "ایتالیایی" }[locale];
  const subject = [subjectPrefix, "پیام سایت FMS", language, reference].filter(Boolean).join(" · ");
  const date = tehranDate.format(created);
  const text = [subject, "ایمیل فرستنده: " + email, "", message, "", "زمان ثبت (تهران): " + date, "شناسهٔ درخواست: " + reference].join("\n");
  const replyHref = "mailto:" + encodeURIComponent(email).replace("%40", "@");
  const html = `<!doctype html>
<html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body dir="rtl" style="margin:0;background:#f1efee;color:#211c20;font:16px/1.8 Tahoma,Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="12"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="20" style="max-width:560px;background:white;border:1px solid #ded9d8;border-radius:12px">
<tr><td bgcolor="#191619" dir="ltr" align="left" style="color:white;border-bottom:4px solid #df183c"><strong>Future Media Services</strong></td></tr>
<tr><td dir="rtl" align="right"><h1 style="font-size:24px;margin:0">پیام جدید از سایت FMS</h1>
<p>زبان فرم: ${escapeHtml(language)}<br>ایمیل فرستنده: <a dir="ltr" href="${escapeHtml(replyHref)}">${escapeHtml(email)}</a></p>
<p dir="auto" style="padding:16px;background:#faf2f3;overflow-wrap:anywhere;text-align:start">${escapeHtml(message).replaceAll("\n", "<br>")}</p>
<p><a href="${escapeHtml(replyHref)}" style="color:#a31235">پاسخ به فرستنده</a></p>
<p style="color:#61575d;font-size:13px">زمان ثبت (تهران): ${escapeHtml(date)}<br>شناسهٔ درخواست: <span dir="ltr">${escapeHtml(reference)}</span></p>
</td></tr></table></td></tr></table></body></html>`;
  return { subject, html, text };
}
