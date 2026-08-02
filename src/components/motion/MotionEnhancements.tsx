"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MotionOrchestrator = dynamic(
  () => import("./MotionOrchestrator").then((module) => module.MotionOrchestrator),
  { ssr: false },
);

export function MotionEnhancements() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const enableMotion = () => setEnabled(true);
    const options = { passive: true, once: true } as const;

    window.addEventListener("scroll", enableMotion, options);
    window.addEventListener("pointerdown", enableMotion, options);
    window.addEventListener("keydown", enableMotion, { once: true });

    return () => {
      window.removeEventListener("scroll", enableMotion);
      window.removeEventListener("pointerdown", enableMotion);
      window.removeEventListener("keydown", enableMotion);
    };
  }, []);

  return enabled ? <MotionOrchestrator /> : null;
}
