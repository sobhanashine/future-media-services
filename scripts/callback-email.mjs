const tehranDate = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "long", timeStyle: "short", timeZone: "Asia/Tehran",
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function displayPhone(phone) {
  // Use familiar grouping when available. The dial link always uses the normalized number.
  return phone
    .replace(/^\+98(9\d{2})(\d{3})(\d{4})$/, "+98 $1 $2 $3")
    .replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1 $1 $2 $3");
}

export function callbackEmail({ phone, locale, created, reference, subjectPrefix }) {
  const subject = [subjectPrefix, "درخواست تماس جدید از وب‌سایت FMS"].filter(Boolean).join(" · ");
  const dialNumber = escapeHtml(phone);
  const visibleNumber = escapeHtml(displayPhone(phone));
  const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="format-detection" content="telephone=no">
  <title>درخواست تماس جدید از وب‌سایت FMS</title>
  <style>
    @media screen and (max-width:480px) {
      .fms-outer { padding:12px 6px !important; }
      .fms-inset { padding-right:20px !important; padding-left:20px !important; }
      .fms-heading { font-size:26px !important; }
      .fms-number { font-size:23px !important; }
    }
  </style>
</head>
<body dir="rtl" style="margin:0;padding:0;background:#f1efee;color:#211c20;font-family:Tahoma,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">یک بازدیدکننده شماره‌اش را برای پیگیری پروژه گذاشته است.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1efee">
    <tr><td class="fms-outer" align="center" style="padding:32px 10px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:520px;border:1px solid #ded9d8;border-radius:12px;border-spacing:0;">
        <tr><td class="fms-inset" bgcolor="#191619" style="padding:19px 32px;border-radius:11px 11px 0 0;border-bottom:4px solid #df183c;">
          <table role="presentation" width="100%" dir="ltr" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" style="font:800 32px/1 Arial,sans-serif;letter-spacing:-2px;color:#ffffff;">FMS<span style="color:#ff4764;">.</span></td>
              <td align="right" style="font:600 13px/1.4 Arial,sans-serif;color:#eee9eb;">Future Media Services</td>
            </tr>
          </table>
        </td></tr>
        <tr><td class="fms-inset" dir="rtl" align="right" style="padding:28px 32px 24px;">
          <h1 class="fms-heading" style="margin:0 0 6px;font:bold 30px/1.6 Tahoma,Arial,sans-serif;color:#211c20;">درخواست تماس جدید</h1>
          <p style="margin:0 0 22px;font:15px/1.85 Tahoma,Arial,sans-serif;color:#554f53;">یک بازدیدکننده برای گفت‌وگو دربارهٔ پروژه‌اش شماره گذاشته است.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td bgcolor="#faf2f3" align="right" style="padding:15px 16px;border-right:3px solid #c40930;">
              <p style="margin:0 0 3px;font:14px/1.6 Tahoma,Arial,sans-serif;color:#645058;">شمارهٔ تماس</p>
              <a class="fms-number" dir="ltr" href="tel:${dialNumber}" style="display:inline-block;direction:ltr;white-space:nowrap;font:bold 27px/1.5 Arial,sans-serif;color:#251c21;text-decoration:none;">${visibleNumber}</a>
            </td></tr>
          </table>
          <table role="presentation" align="right" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
            <tr><td align="center" bgcolor="#bd0b32" style="border-radius:7px;">
              <a href="tel:${dialNumber}" style="display:inline-block;padding:11px 22px;border:1px solid #bd0b32;border-radius:7px;font:bold 15px/1.6 Tahoma,Arial,sans-serif;color:#ffffff;text-decoration:none;">تماس با این شماره</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td class="fms-inset" dir="rtl" align="right" style="padding:0 32px 22px;">
          <table width="100%" dir="rtl" cellpadding="0" cellspacing="0" border="0" aria-label="جزئیات درخواست" style="border-top:1px solid #e8e2e3;font:14px/1.7 Tahoma,Arial,sans-serif;">
            <tr>
              <th scope="row" align="right" valign="top" style="padding:14px 0 5px 10px;color:#665b61;font-weight:normal;">زمان ثبت (تهران)</th>
              <td align="left" valign="top" style="padding:14px 0 5px;color:#292127;">${escapeHtml(tehranDate.format(created))}</td>
            </tr>
            <tr>
              <th scope="row" align="right" style="padding:5px 0 0 10px;color:#665b61;font-weight:normal;">زبان فرم</th>
              <td align="left" style="padding:5px 0 0;color:#292127;">${({ en: "انگلیسی", it: "ایتالیایی" })[locale] ?? "فارسی"}</td>
            </tr>
          </table>
        </td></tr>
        <tr><td class="fms-inset" dir="rtl" align="right" bgcolor="#f9f8f7" style="border-top:1px solid #e8e2e3;border-radius:0 0 11px 11px;padding:12px 32px;font:12px/1.7 Tahoma,Arial,sans-serif;color:#665b61;">
          شناسهٔ درخواست &nbsp;<span dir="ltr" style="display:inline-block;direction:ltr;font-family:Consolas,monospace;">${escapeHtml(reference)}</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  return { subject, html };
}
