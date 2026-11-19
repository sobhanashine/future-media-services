function hasNativeWheelTarget(event: WheelEvent, root: HTMLElement) {
  for (const ancestor of event.composedPath()) {
    if (ancestor === root || ancestor === document.body) break;
    if (!(ancestor instanceof HTMLElement)) continue;
    if (ancestor.matches("input, textarea, select, [contenteditable=true], dialog, [role=dialog]")) return true;
    if (ancestor.scrollHeight > ancestor.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(ancestor).overflowY)) return true;
  }
  return false;
}

export function smoothWheel(root: HTMLElement) {
  const controller = new AbortController();
  const { signal } = controller;
  let frame = 0;
  let target = 0;
  let position = 0;
  let previousTime = 0;
  let lastWritten = 0;
  let lastPreciseInput = -Infinity;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function tick(now: number) {
    // Yield to focus changes, browser history and programmatic scrolling.
    if (Math.abs(window.scrollY - lastWritten) > 1 || document.body.dataset.menuOpen === "true") {
      stop();
      return;
    }
    const elapsed = Math.min(64, now - previousTime);
    previousTime = now;
    position += (target - position) * (1 - Math.exp(-elapsed / 78));
    const done = Math.abs(target - position) < 0.75;
    window.scrollTo({ top: done ? target : position, behavior: "instant" });
    lastWritten = window.scrollY;
    frame = done ? 0 : requestAnimationFrame(tick);
  }

  function onWheel(event: WheelEvent) {
    // Preserve high-resolution trackpad gestures and native horizontal rails,
    // zoom, controls, and nested scrolling surfaces.
    const amount = Math.abs(event.deltaY);
    const precise = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (
      amount < 48 || !Number.isInteger(amount) || event.deltaX !== 0 || event.timeStamp - lastPreciseInput < 140
    );
    if (precise) lastPreciseInput = event.timeStamp;
    if (
      precise || !event.cancelable || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey ||
      event.shiftKey || amount <= Math.abs(event.deltaX) || document.body.dataset.menuOpen === "true" ||
      hasNativeWheelTarget(event, root)
    ) {
      stop();
      return;
    }
    let delta = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;
    const current = window.scrollY;
    const limit = Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
    if (!frame || Math.abs(current - lastWritten) > 1) {
      position = target = lastWritten = current;
      previousTime = performance.now();
    }
    // Reversing the wheel should immediately reverse direction.
    if ((target - current) * delta < 0) target = current;
    target = Math.max(0, Math.min(limit, target + delta));
    if (target === current) {
      stop();
      return;
    }
    event.preventDefault();
    if (!frame) frame = requestAnimationFrame(tick);
  }

  window.addEventListener("wheel", onWheel, { passive: false, signal });
  for (const event of ["keydown", "pointerdown", "touchstart", "hashchange", "popstate", "blur", "pagehide"]) {
    window.addEventListener(event, stop, { passive: true, signal });
  }
  document.addEventListener("focusin", stop, { passive: true, signal });
  return () => { controller.abort(); stop(); };
}
