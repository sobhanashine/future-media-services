import localFont from "next/font/local";

export const yekanBakh = localFont({
  src: [
    { path: "./yekan-bakh/YekanBakh-Regular.woff2", weight: "400", style: "normal" },
    { path: "./yekan-bakh/YekanBakh-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const studioLight = localFont({
  src: "./yekan-bakh/YekanBakh-Light.woff2",
  weight: "300",
  variable: "--studio-light",
  display: "swap",
  preload: false,
});
