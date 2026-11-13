import { useEffect, useRef, useState } from 'react';
import { projectJourneyBall, setJourneyBallActive, setJourneyMotionPaused } from './ballJourneyBridge.js';

const clamp = (n) => Math.max(0, Math.min(1, n));
const lerp = (a, b, p) => a + (b - a) * p;

export default function BallJourney() {
  const host = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let scene, raf = 0, disposed = false, anchors = [];
    host.current.style.opacity = '0';
    setJourneyMotionPaused(paused);
    const top = (node) => node.getBoundingClientRect().top + scrollY;
    const measure = () => {
      const width = document.documentElement.clientWidth, height = innerHeight;
      const edge = width < 760 ? 30 : Math.max(56, (width - 1440) / 2 + 40);
      const story = document.getElementById('the-point');
      if (!story) return;
      const start = top(story), end = start + story.offsetHeight - height;
      const entry = projectJourneyBall(0), exit = projectJourneyBall(1);
      const stage = document.querySelector('.rally-sticky').getBoundingClientRect();
      const entryY = entry ? entry.y - stage.top : height * 0.25;
      const exitY = exit ? exit.y - stage.top : height * 0.3;
      const standard = width < 760 ? 32 : 44;
      anchors = [
        { at: 0, x: width * 0.85, y: height * 0.26, size: standard },
        { at: top(document.getElementById('academy')) - height * 0.35, x: edge, y: height * 0.38, size: standard },
        { at: start, x: entry?.x ?? width * 0.86, y: entryY, size: entry?.size ?? standard },
        { at: end, x: exit?.x ?? width * 0.55, y: exitY, size: exit?.size ?? standard },
        ...[
          ['coaching', 1, 0.39], ['gallery', 0, 0.48],
          ['academy-films', 1, 0.61], ['booking', 0, 0.66], ['questions', 1, 0.73], ['page-end', 1, 0.86],
        ].filter(([id]) => document.getElementById(id)).map(([id, right, y]) => ({ at: Math.min(document.documentElement.scrollHeight - height, top(document.getElementById(id)) + 80), x: right ? width - edge : edge, y: height * y, size: standard })),
      ];
      schedule();
    };
    const update = () => {
      raf = 0;
      if (!scene || disposed || document.hidden || !anchors.length || preference.matches || paused) return;
      const y = scrollY, start = anchors[2].at, end = anchors[3].at;
      let point, contact = 0, wallBounce = false;
      if (y >= start && y <= end) {
        const progress = clamp((y - start) / Math.max(1, end - start));
        point = projectJourneyBall(progress);
        contact = Math.max(0, 1 - Math.abs(progress - 0.52) / 0.035);
      }
      if (!point) {
        let index = anchors.findIndex((item) => item.at > y);
        if (index < 0) index = anchors.length - 1;
        index = Math.max(1, index);
        const a = anchors[index - 1], b = anchors[index];
        const p = clamp((y - a.at) / Math.max(1, b.at - a.at));
        // Deterministic scroll keyframes: returning to the same scroll position
        // returns to the same ball pose, including after reversing direction.
        // Constant lateral travel keeps momentum into the wall; the following
        // segment reflects its direction. A shallow arc gives each bounce lift.
        const arc = Math.min(innerHeight * 0.12, 96) * 4 * p * (1 - p);
        point = { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p) - arc, size: lerp(a.size, b.size, p) };
        // Projected racquet entry/exit are not walls. Compress only at a real
        // side waypoint, and derive the pose from scroll for exact reversal.
        const distance = Math.min(index - 1 === 2 || index - 1 === 3 ? 1 : p, index === 2 || index === 3 ? 1 : 1 - p);
        contact = Math.max(0, 1 - distance / 0.055);
        wallBounce = true;
      }
      // The rendered sphere fills ~72% of its transparent canvas.
      const size = point.size / 0.72;
      host.current.style.transform = `translate3d(${point.x - size / 2}px,${point.y - size / 2}px,0) scale(${size / 96})`;
      host.current.style.opacity = '1';
      host.current.dataset.section = y < start ? 'arrival' : y <= end ? 'contact' : 'explore';
      scene.draw(y / 160, contact, wallBounce);
    };
    const schedule = () => { if (!raf && !disposed) raf = requestAnimationFrame(update); };
    const onPreference = () => { setJourneyBallActive(Boolean(scene) && !preference.matches && !paused); host.current.style.opacity = preference.matches || paused ? '0' : '1'; measure(); };
    const resize = new ResizeObserver(measure);
    resize.observe(document.getElementById('root'));
    const load = async () => {
      if (preference.matches || paused) return;
      try {
        const { createJourneyBall } = await import('./journey-ball-scene.js');
        if (disposed || preference.matches || paused) return;
        scene = createJourneyBall(host.current);
        setJourneyBallActive(true);
        host.current.querySelector('canvas').addEventListener('webglcontextlost', () => { setJourneyBallActive(false); host.current.style.opacity = '0'; }, { once: true });
        measure();
      } catch { setJourneyBallActive(false); }
    };
    const changePreference = () => { if (!scene && !preference.matches) load(); onPreference(); };
    const visible = () => { if (!document.hidden) schedule(); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('atb:scene-ready', measure);
    document.addEventListener('visibilitychange', visible);
    preference.addEventListener('change', changePreference);
    load();
    return () => {
      disposed = true; cancelAnimationFrame(raf); resize.disconnect();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure);
      window.removeEventListener('atb:scene-ready', measure); document.removeEventListener('visibilitychange', visible);
      preference.removeEventListener('change', changePreference);
      setJourneyBallActive(false); scene?.dispose();
      setJourneyMotionPaused(false);
    };
  }, [paused]);
  return <><div className="journey-layer" aria-hidden="true"><div ref={host} className="journey-ball" /></div><button className="journey-control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume ball' : 'Pause ball'}<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{paused ? <path d="m8 5 11 7-11 7Z" /> : <path d="M8 5v14M16 5v14" />}</svg></button></>;
}
