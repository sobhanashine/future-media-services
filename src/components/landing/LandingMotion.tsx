"use client";

import { useEffect, useRef } from "react";
import { enablePageMotion, observeReveals } from "@/components/motion/viewportReveals";
import layout from "./Landing.module.css";
import motion from "./LandingMotion.module.css";

const revealGroups = {
  title: "h1, h2",
  copy: [
    `.${layout.studioTag}, .${layout.heroInner} > p, .${layout.heroActions}`,
    `.${layout.sectionIntro} > :not(h2)`,
    `.${layout.about} > :not(h2)`,
    `.${layout.callout} > div:first-child > :not(h2)`,
  ].join(", "),
  card: [
    layout.featureCard, layout.microCard, layout.serviceCard, layout.story,
  ].map(name => `.${name}`).concat([
    `.${layout.stepGrid} > article`, `.${layout.socialRail} > a`,
  ]).join(", "),
  row: [
    layout.values, layout.stackRail, layout.compareBox, layout.faqList,
  ].map(name => `.${name} > *`).join(", "),
  media: [
    layout.orbitWindow, layout.fan, layout.caseArt, layout.caseScreen, layout.studioPhoto, layout.calloutVisual,
  ].map(name => `.${name}`).join(", "),
};

function revealSections(root: HTMLElement) {
  const clearReveals = observeReveals(root, revealGroups);
  const loops = `.${layout.brandTrack}, .${layout.orbitDisc}`;
  const ambient = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.querySelector(loops)?.classList.toggle(motion.paused, !entry.isIntersecting);
    }
  });
  root.querySelectorAll(`.${layout.brandReel}, .${layout.orbitWindow}`).forEach(scene => ambient.observe(scene));

  const hero = root.querySelector(`.${layout.hero}`);
  const sky = root.querySelector(`.${layout.sky}`);
  const frames = root.querySelectorAll(`.${layout.caseArt}`);
  const photoScenes = root.querySelectorAll(`.${layout.case}`);
  hero?.classList.add(motion.hero);
  sky?.classList.add(motion.backdrop);
  frames.forEach(frame => frame.classList.add(motion.frame));
  photoScenes.forEach(scene => scene.classList.add(motion.photoScene));
  root.classList.add(motion.enabled);

  return () => {
    clearReveals();
    ambient.disconnect();
    root.querySelectorAll(loops).forEach(loop => loop.classList.remove(motion.paused));
    root.classList.remove(motion.enabled);
    frames.forEach(frame => frame.classList.remove(motion.frame));
    photoScenes.forEach(scene => scene.classList.remove(motion.photoScene));
    hero?.classList.remove(motion.hero);
    sky?.classList.remove(motion.backdrop);
  };
}

export function LandingMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.parentElement;
    if (!root) return;
    return enablePageMotion(root, () => revealSections(root));
  }, []);
  return <span ref={marker} hidden />;
}
