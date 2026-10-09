/* =========================================================
    SCROLL TO SECTION

    The browser's own smooth scroll is fire-and-forget: it
    locks onto a pixel value, and Chrome abandons it if the
    document shifts mid-flight. On this page it has to cross
    several thousand pixels past a 4-viewport sticky section,
    so it regularly gives up early.

    This drives the scroll on rAF instead, re-reading the
    target's position every frame. Layout shifts can't throw
    it off, and a user scroll or wheel cancels it cleanly.
========================================================= */

const OFFSET = 96; // clears the sticky header
const DURATION = 900; // ms

/** easeInOutCubic — slow start, slow finish */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let cancelActive: (() => void) | null = null;

export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;

  const target = document.getElementById(id);

  if (!target) {
    console.warn(`scrollToSection: no element with id "${id}"`);
    return;
  }

  // Stop any scroll already in progress.
  cancelActive?.();

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const destination = () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    const top =
      target.getBoundingClientRect().top + window.scrollY - OFFSET;

    return Math.max(0, Math.min(top, max));
  };

  if (reduceMotion) {
    window.scrollTo({ top: destination(), behavior: "auto" });
    return;
  }

  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const startY = window.scrollY;
  const startTime = performance.now();

  let frame = 0;
  let expectedY = startY;

  const stop = () => {
    cancelAnimationFrame(frame);
    root.style.scrollBehavior = previousBehavior;
    window.removeEventListener("wheel", onUserScroll);
    window.removeEventListener("touchstart", onUserScroll);
    window.removeEventListener("keydown", onUserScroll);
    cancelActive = null;
  };

  function onUserScroll(event?: Event) {
    if (event?.type === "keydown") {
      const key = (event as KeyboardEvent).key;
      const scrollKeys = [
        "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ",
      ];
      if (!scrollKeys.includes(key)) return;
    }
    stop();
  }

  const step = (now: number) => {
    // If the page moved without us, the user took over.
    if (Math.abs(window.scrollY - expectedY) > 2) {
      stop();
      return;
    }

    const elapsed = now - startTime;
    const t = Math.min(elapsed / DURATION, 1);

    // Target is re-read every frame, so images loading or
    // reveals firing below can't strand us short.
    const end = destination();
    const next = startY + (end - startY) * ease(t);

    window.scrollTo(0, next);
    expectedY = window.scrollY;

    if (t < 1) {
      frame = requestAnimationFrame(step);
      return;
    }

    // Final correction for anything that shifted on the last frame.
    const drift = target.getBoundingClientRect().top - OFFSET;
    if (Math.abs(drift) > 4) window.scrollTo(0, destination());

    stop();
  };

  window.addEventListener("wheel", onUserScroll, { passive: true });
  window.addEventListener("touchstart", onUserScroll, {
    passive: true,
  });
  window.addEventListener("keydown", onUserScroll);

  cancelActive = stop;
  frame = requestAnimationFrame(step);
}
