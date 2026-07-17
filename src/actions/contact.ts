"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/contact-schema";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimit = new Map<string, number>();

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(raw);
  const locale = raw.locale === "en" ? "en" : "fa";

  if (!parsed.success) {
    return {
      status: "error",
      message:
        locale === "fa"
          ? "لطفاً فیلدهای مشخص‌شده را بررسی کنید."
          : "Please review the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const requestHeaders = await headers();
  const requester =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const lastSubmission = rateLimit.get(requester) ?? 0;
  const now = Date.now();

  if (now - lastSubmission < rateLimitWindowMs) {
    return {
      status: "error",
      message:
        locale === "fa"
          ? "درخواست قبلی دریافت شده است. لطفاً چند دقیقه بعد دوباره تلاش کنید."
          : "Your previous request was received. Please wait a few minutes before trying again.",
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    if (process.env.NODE_ENV === "production") {
      return {
        status: "error",
        message:
          locale === "fa"
            ? "مسیر ارسال هنوز فعال نشده است. لطفاً از اینستاگرام با ما در تماس باشید."
            : "The delivery channel is not active yet. Please contact us on Instagram.",
      };
    }

    rateLimit.set(requester, now);
    return {
      status: "success",
      message:
        locale === "fa"
          ? "فرم در حالت پیش‌نمایش با موفقیت اعتبارسنجی شد؛ هیچ پیامی ارسال نشد."
          : "The form passed validation in preview mode; no message was sent.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Contact provider rejected the request");
    }

    rateLimit.set(requester, now);
    return {
      status: "success",
      message:
        locale === "fa"
          ? "درخواست شما دریافت شد. برای ادامه گفتگو با شما تماس می‌گیریم."
          : "Your request has been received. We’ll get in touch to continue the conversation.",
    };
  } catch {
    return {
      status: "error",
      message:
        locale === "fa"
          ? "ارسال انجام نشد. اتصال را بررسی کنید یا از اینستاگرام پیام بدهید."
          : "The message could not be sent. Check your connection or contact us on Instagram.",
    };
  }
}
