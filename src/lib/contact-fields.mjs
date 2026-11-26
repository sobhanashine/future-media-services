export const maxEmailLength = 254;
export const maxMessageLength = 3000;

export function contactEmailAddress(value) {
  if (typeof value !== "string" || /[\r\n]/.test(value)) return null;
  const email = value.trim();
  if (!email || email.length > maxEmailLength) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  const atom = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+$/i;
  const label = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
  if (local.length > 64 || !local.split(".").every(part => atom.test(part))) return null;
  if (!domain.includes(".") || !domain.split(".").every(part => label.test(part))) return null;
  return local + "@" + domain.toLowerCase();
}

export function contactMessage(value) {
  if (typeof value !== "string") return null;
  const message = value.replace(/\r\n?/g, "\n").trim();
  if (!message || message.length > maxMessageLength || /\p{Cc}/u.test(message.replace(/[\n\t]/g, ""))) return null;
  return message;
}
