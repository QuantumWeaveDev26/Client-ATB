import QualityImage from './QualityImage.jsx';
import { useEffect, useRef, useState } from 'react';
import { journeyMotionPaused, registerBallProjector } from './ballJourneyBridge.js';
import { scrollToSection } from './useSiteMotion.js';

const CHAPTERS = [
  { label: 'Prepare', title: 'Find your feet.', copy: 'A balanced stance. A little focus. Every good rally starts before the ball reaches you.', at: 0.08 },
  { label: 'Connect', title: 'Meet the moment.', copy: 'Watch the ball into the strings. Feel the connection. Give your next shot a purpose.', at: 0.52 },
  { label: 'Follow through', title: 'Make it your game.', copy: 'Finish the swing, recover your position, and get ready to do it all over again.', at: 0.9 },
];
const clamp = (value) => Math.max(0, Math.min(1, value));

export default function TennisExperience() {
  const section = useRef(null), host = useRef(null), progressBar = useRef(null);
  const [chapter, setChapter] = useState(0), [status, setStatus] = useState('loading');
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let disposed = false, scene, raf = 0, visible = false, current = 0, previous = -1, unregister;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const draw = () => {
      raf = 0;
      if (disposed || !scene || !visible || document.hidden) return;
      const bounds = section.current.getBoundingClientRect();
      current = preference.matches || journeyMotionPaused() ? 0.52 : clamp(-bounds.top / Math.max(1, section.current.offsetHeight - innerHeight));
      scene.draw(current);
      const next = current < 0.33 ? 0 : current < 0.7 ? 1 : 2;
      if (next !== previous) { previous = next; setChapter(next); }
      if (progressBar.current) progressBar.current.style.transform = `scaleX(${current})`;
    };
    const schedule = () => { if (!raf && !disposed) raf = requestAnimationFrame(draw); };
    const changePreference = () => {
      setReduced(preference.matches);
      section.current.classList.toggle('has-reduced-motion', preference.matches);
      schedule();
    };
    changePreference();
    const resize = new ResizeObserver(() => { scene?.resize(); schedule(); });
    resize.observe(host.current);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); });
    visibility.observe(host.current);
    const load = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || disposed || scene) return;
      load.disconnect();
      try {
        const { createTennisScene } = await import('./tennis-scene.js');
        if (disposed) return;
        scene = createTennisScene(host.current);
        unregister = registerBallProjector((progress) => scene?.projectBall(progress));
        window.dispatchEvent(new Event('atb:scene-ready'));
        scene.canvas.addEventListener('webglcontextlost', (event) => {
          event.preventDefault(); setStatus('fallback'); section.current?.classList.add('has-static-scene');
          unregister?.(); scene?.dispose(); scene = null;
        }, { once: true });
        setStatus('ready'); schedule();
      } catch { if (!disposed) { setStatus('fallback'); section.current?.classList.add('has-static-scene'); } }
    }, { rootMargin: '700px' });
    load.observe(section.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('atb:journey-ball', schedule);
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', changePreference);
    return () => {
      disposed = true; cancelAnimationFrame(raf); load.disconnect(); visibility.disconnect(); resize.disconnect(); unregister?.();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      window.removeEventListener('atb:journey-ball', schedule); document.removeEventListener('visibilitychange', schedule);
      preference.removeEventListener('change', changePreference); scene?.dispose();
    };
  }, []);
  const active = CHAPTERS[chapter];
  const seek = (item) => {
    if (reduced) { setChapter(CHAPTERS.indexOf(item)); return; }
    const y = section.current.getBoundingClientRect().top + scrollY;
    scrollToSection(y + item.at * Math.max(1, section.current.offsetHeight - innerHeight));
  };
  return <section ref={section} id="the-point" className="rally-story" aria-labelledby="rally-heading">
    <div className="rally-sticky"><div className="rally-content section-wrap">
      <div className="rally-intro"><h2 id="rally-heading">It starts{' '}<br />with a feeling.</h2><p>The anticipation. The connection.<br />That one shot that brings you back.</p></div>
      <div className="rally-stage" role="img" aria-label="3D tennis racquet meeting the travelling ball and following through">
        <QualityImage className={`rally-poster ${status === 'ready' ? 'is-hidden' : ''}`} src="/images/enhanced/tennis-contact-poster.webp" alt="" loading="lazy" width="1448" height="1086" />
        <div ref={host} className={`rally-canvas ${status === 'ready' ? 'is-ready' : ''}`} />
      </div>
      <div className="rally-narrative"><div className="rally-chapter-copy" aria-live="polite"><h3>{active.title}</h3><p>{active.copy}</p></div><a className="rally-coaching-link" href="#coaching">Find your game at ATB <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></a></div>
      <div className="rally-bottom"><div className="rally-chapters" role="group" aria-label="Explore the tennis swing">{CHAPTERS.map((item, index) => <button key={item.label} type="button" aria-pressed={chapter === index} onClick={() => seek(item)}><span>{index + 1}</span>{item.label}</button>)}<div className="rally-progress"><span ref={progressBar} /></div></div><p className="rally-direction">{reduced ? 'Explore each stage' : 'Scroll down to play. Up to rewind.'}</p></div>
      <p className="rally-scroll-cue">{reduced ? 'A good game is built one point at a time.' : 'Follow the ball. Find your game.'}<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 4v15m-5-5 5 5 5-5" /></svg></p>
    </div></div>
  </section>;
}
