import localFont from "next/font/local";

export const studioLatin = localFont({
  src: "./dm-sans/DM-Sans-Latin.woff2",
  weight: "100 1000",
  variable: "--studio-latin",
  display: "swap",
  preload: false,
});

export const studioLight = localFont({
  src: "./yekan-bakh/YekanBakh-Light.woff2",
  weight: "300",
  variable: "--studio-light",
  display: "swap",
  preload: false,
});
