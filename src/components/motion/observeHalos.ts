import halo from "./Halos.module.css";

export function observeHalos(root: HTMLElement) {
  const lights = root.querySelectorAll(`[data-fms-halo], .${halo.indicator}`);
  if (!lights.length) return;

  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle(halo.lit, entry.isIntersecting);
  });
  lights.forEach(light => visibility.observe(light));
  const setForeground = () => root.classList.toggle(halo.foreground, !document.hidden);
  setForeground();
  document.addEventListener("visibilitychange", setForeground);

  return () => {
    visibility.disconnect();
    document.removeEventListener("visibilitychange", setForeground);
    root.classList.remove(halo.foreground);
    lights.forEach(light => light.classList.remove(halo.lit));
  };
}
