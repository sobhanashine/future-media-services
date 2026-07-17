"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FutureCoreCanvas = dynamic(
  () => import("./FutureCoreCanvas").then((module) => module.FutureCoreCanvas),
  { ssr: false },
);

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

function canRenderWebGl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function FutureCoreLoader({ label }: { label: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
    const smallScreen = window.matchMedia("(max-width: 720px)").matches;

    const frame = window.requestAnimationFrame(() => {
      setCompact(smallScreen);
      setEnabled(!reducedMotion && !saveData && canRenderWebGl());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || !enabled) return;

    const updateVisibility = (isIntersecting: boolean) => {
      intersectingRef.current = isIntersecting;
      setActive(isIntersecting && document.visibilityState === "visible");
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateVisibility(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(element);

    const onVisibilityChange = () => updateVisibility(intersectingRef.current);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled]);

  return (
    <div ref={wrapperRef} className="future-core" role="img" aria-label={label}>
      <div className="future-core__poster" aria-hidden="true">
        <span className="poster-orbit poster-orbit--one" />
        <span className="poster-orbit poster-orbit--two" />
        <span className="poster-center" />
      </div>
      {enabled ? <FutureCoreCanvas active={active} compact={compact} /> : null}
      <div className="future-core__caption" aria-hidden="true">
        <span>FUTURE / CORE</span>
        <span>001</span>
      </div>
    </div>
  );
}
