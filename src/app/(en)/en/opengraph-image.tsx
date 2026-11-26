import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Future Media Services — Web design and Instagram content";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage("en");
}
