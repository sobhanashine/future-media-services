import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Future Media Services — Strategy, Design, Technology";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage();
}
