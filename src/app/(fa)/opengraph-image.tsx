import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Future Media Services — استراتژی، طراحی و تکنولوژی";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage();
}
