import { animate } from "framer-motion/dom/mini";
import { smoothWheel } from "./smoothWheel";
import { observeHalos } from "./observeHalos";

type Keyframes = Parameters<typeof animate>[1];
type Kind = "title" | "copy" | "card" | "row" | "media" | "panel";
type Groups = Partial<Record<Kind, string>>;

const ease = [0.16, 0.78, 0.22, 1] as const;
const durations: Record<Kind, number> = { title: .62, copy: .48, card: .6, panel: .6, row: .44, media: .72 };
const rise: Keyframes = { opacity: [.42, 1], translate: ["0 24px", "0 0"] };

function entrance(kind: Kind, rtl: boolean): Keyframes {
  switch (kind) {
    case "title": return { opacity: [.55, 1], translate: ["0 19px", "0 0"] };
    case "copy": return { opacity: [.58, 1], translate: ["0 9px", "0 0"] };
    case "card":
    case "panel": return rise;
    case "row": return { opacity: [.55, 1], translate: [rtl ? "13px 0" : "-13px 0", "0 0"] };
    case "media": return { opacity: [.65, 1], clipPath: ["inset(6% 2% 1% round 8px)", "inset(0% 0% 0% round 0px)"] };
  }
}

export function observeReveals(root: HTMLElement, groups: Groups) {
  const clearHalos = observeHalos(root);
  const rtl = document.documentElement.dir === "rtl";
  const wide = window.matchMedia("(min-width: 680px)");
  const assigned: HTMLElement[] = [];
  const playing = new Map<HTMLElement, () => void>();
  for (const [kind, selector] of Object.entries(groups)) {
    root.querySelectorAll<HTMLElement>(selector).forEach(element => {
      if (element.dataset.fmsReveal) return;
      element.dataset.fmsReveal = kind;
      assigned.push(element);
    });
  }

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-fms-reveal]"))
    .filter(element => !element.parentElement?.closest("[data-fms-reveal]"));
  const observer = new IntersectionObserver(entries => {
    const siblings = new Map<HTMLElement, number>();
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      observer.unobserve(element);
      if (entry.boundingClientRect.top < 44 || element.matches(":focus-within")) continue;
      const kind = element.dataset.fmsReveal as Kind;
      const parent = element.parentElement!;
      const index = siblings.get(parent) ?? 0;
      siblings.set(parent, index + 1);
      element.dataset.fmsEntered = "";

      const frames = entrance(kind, rtl);
      const properties = Object.keys(frames).map(key => key === "clipPath" ? "clip-path" : key);
      const previous = properties.map(property => element.style.getPropertyValue(property));
      const controls = animate(element, frames, {
        duration: durations[kind], ease: [...ease],
        delay: wide.matches ? Math.min(index, 2) * .05 : 0,
      });
      // Motion writes the last keyframe inline. Give control back to the
      // stylesheet after playback so focus/hover and responsive rules still win.
      const restore = () => {
        if (!playing.delete(element)) return;
        controls.cancel();
        properties.forEach((property, i) => element.style.setProperty(property, previous[i]));
      };
      playing.set(element, restore);
      void controls.finished.then(restore);
    }
  }, { rootMargin: "0px 0px -4% 0px" });
  targets.forEach(target => observer.observe(target));

  const onFocus = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    for (const [element, restore] of playing) if (element.contains(target)) restore();
  };
  root.addEventListener("focusin", onFocus);
  return () => {
    clearHalos?.();
    observer.disconnect();
    root.removeEventListener("focusin", onFocus);
    for (const restore of playing.values()) restore();
    targets.forEach(element => element.removeAttribute("data-fms-entered"));
    assigned.forEach(element => element.removeAttribute("data-fms-reveal"));
  };
}

export function enablePageMotion(root: HTMLElement, setup: () => () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
  let clearMotion: (() => void) | undefined;
  let clearWheel: (() => void) | undefined;
  const syncWheel = () => {
    clearWheel?.();
    clearWheel = !reduce.matches && desktop.matches ? smoothWheel(root) : undefined;
  };
  const syncMotion = () => {
    clearMotion?.();
    clearMotion = !reduce.matches && "IntersectionObserver" in window && typeof Element.prototype.animate === "function"
      ? setup() : undefined;
    syncWheel();
  };
  syncMotion();
  reduce.addEventListener("change", syncMotion);
  desktop.addEventListener("change", syncWheel);
  return () => {
    reduce.removeEventListener("change", syncMotion);
    desktop.removeEventListener("change", syncWheel);
    clearMotion?.();
    clearWheel?.();
  };
}
