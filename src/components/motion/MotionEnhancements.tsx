"use client";

import { locales, localePath } from "@/content/locales";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { enablePageMotion, observeReveals } from "./viewportReveals";
import motion from "../landing/LandingMotion.module.css";

const reveals = {
  title: "h1, h2",
  copy: "[data-hero-reveal]",
  row: "details[data-reveal]",
  card: "article[data-reveal], a[data-reveal], .pricing-plan",
  panel: "[data-reveal]",
};

export function MotionEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    if (locales.some(locale => localePath(locale) === pathname)) return;
    const main = document.getElementById("main-content");
    if (!main) return;
    return enablePageMotion(main, () => {
      const clearReveals = observeReveals(main, reveals);
      const media = main.querySelectorAll("[data-project-media]");
      media.forEach(item => item.classList.add(motion.galleryMedia));
      return () => {
        clearReveals();
        media.forEach(item => item.classList.remove(motion.galleryMedia));
      };
    });
  }, [pathname]);
  return null;
}
