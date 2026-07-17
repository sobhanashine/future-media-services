"use client";

import dynamic from "next/dynamic";

const MotionOrchestrator = dynamic(
  () => import("./MotionOrchestrator").then((module) => module.MotionOrchestrator),
  { ssr: false },
);

export function MotionEnhancements() {
  return <MotionOrchestrator />;
}
