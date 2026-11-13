import { useEffect } from 'react';

const noScroller = () => null;
const sectionSelector = 'main > section:not(.hero)';
const editingSelector = 'input, textarea, select, [contenteditable="true"]';
const scrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']);

// Settle near a section boundary, without paging through long content or
// competing with the window-scroll-driven tennis scene. No nested scrollers.
export function useViewportSections(getScroller = noScroller) {
  useEffect(() => {
    let timer;
    let origin = null;
    let lastY = window.scrollY;
    let lastInput = 0;
    let touching = false;
    const cancel = () => {
      clearTimeout(timer);
      origin = null;
    };
    const begin = (event) => {
      if (event.target.closest?.(`${editingSelector}, dialog[open], [data-lenis-prevent]`)) {
        cancel();
        return;
      }
      // A new gesture can leave a settled boundary even with a small wheel delta.
      if (origin === null || performance.now() - lastInput > 260) origin = window.scrollY;
      lastInput = performance.now();
    };
    const settle = () => {
      clearTimeout(timer);
      if (origin === null || touching || document.hidden) return;
      if (document.activeElement?.matches(editingSelector) || document.querySelector('dialog[open]')) return cancel();
      const scroller = getScroller();
      if (scroller?.isScrolling === 'smooth') {
        timer = setTimeout(settle, 180);
        return;
      }
      const y = window.scrollY;
      const direction = Math.sign(y - origin);
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = Math.min(120, window.innerHeight * 0.16);
      const points = [0, ...Array.from(document.querySelectorAll(sectionSelector), section =>
        section.getBoundingClientRect().top + y)];
      const target = points.filter(point => point >= 0 && point <= limit &&
        // Never pull back to the boundary the user is deliberately leaving.
        (point - origin) * direction > 2 && Math.abs(point - y) <= threshold)
        .sort((a, b) => Math.abs(a - y) - Math.abs(b - y))[0];
      cancel();
      if (target === undefined || Math.abs(target - y) < 1) return;
      if (scroller) scroller.scrollTo(target, { duration: 0.35 });
      else window.scrollTo({ top: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    const scroll = () => {
      if (window.scrollY === lastY) return;
      lastY = window.scrollY;
      clearTimeout(timer);
      if (origin !== null) timer = setTimeout(settle, 200);
    };
    const touchStart = event => { touching = true; begin(event); };
    const touchEnd = () => { touching = false; if (origin !== null) timer = setTimeout(settle, 200); };
    const key = event => {
      if (scrollKeys.has(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) begin(event);
      else cancel();
    };
    const click = () => cancel(); // Anchors, chapter controls and focus own their destinations.
    window.addEventListener('wheel', begin, { passive: true });
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchend', touchEnd, { passive: true });
    window.addEventListener('touchcancel', touchEnd, { passive: true });
    window.addEventListener('keydown', key);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('resize', cancel);
    document.addEventListener('click', click, true);
    document.addEventListener('visibilitychange', cancel);
    return () => {
      cancel();
      window.removeEventListener('wheel', begin);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('touchcancel', touchEnd);
      window.removeEventListener('keydown', key);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('resize', cancel);
      document.removeEventListener('click', click, true);
      document.removeEventListener('visibilitychange', cancel);
    };
  }, [getScroller]);
}
