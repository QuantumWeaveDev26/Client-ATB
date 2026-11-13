import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import './motion.css';

gsap.registerPlugin(ScrollTrigger);
let activeScroller = null;

export function scrollToSection(target) {
  if (typeof target === 'number') {
    if (activeScroller) activeScroller.scrollTo(target, { duration: 0.85 });
    else window.scrollTo({ top: target, behavior: 'instant' });
    return;
  }
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  if (activeScroller) activeScroller.scrollTo(element, { offset: 0, duration: 0.85 });
  else element.scrollIntoView({ behavior: 'instant', block: 'start' });
}

export function useSiteMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false, autoRaf: false,
        prevent: (node) => Boolean(node.closest('textarea, select, [data-lenis-prevent]')) });
      activeScroller = lenis;
      const tick = (time) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add('has-site-motion');

      // One clock for smooth scrolling and scroll-linked animations. The 3D scene
      // reads the resulting native scroll position, so its sticky stage stays aligned.
      const hero = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', clearProps: 'transform,opacity' } });
      hero.from('.hero-photo', { scale: 1.12, duration: 1.5, clearProps: 'transform' }, 0)
        .from('.hero-line-inner', { yPercent: 110, skewY: 4, duration: 0.95, stagger: 0.13, clearProps: 'transform' }, 0.08)
        .from('.hero-copy > p, .hero-actions, .hero-location', { y: 24, opacity: 0.25, duration: 0.7, stagger: 0.1 }, 0.5)
        .from('.hero-planner', { y: 32, opacity: 0.4, duration: 0.8 }, 0.65);
      ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onEnterBack: () => hero.restart() });
      gsap.from('.founder-profile', { y: 28, opacity: 0.4, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '#founders', start: 'top 85%', toggleActions: 'play none none reverse' } });

      const entering = (trigger, start = 'top 85%') => ({ trigger, start, toggleActions: 'play none none reverse' });
      const academyIntro = gsap.timeline({ scrollTrigger: entering('#academy', 'top 80%') });
      academyIntro.fromTo('.academy-community-photo', { clipPath: 'inset(6% 0% 6% 0% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1, ease: 'expo.out', clearProps: 'clipPath' }, 0)
        .from('.academy-intro-content > div', { y: 24, opacity: 0.45, duration: 0.75, stagger: 0.1, ease: 'expo.out', clearProps: 'transform,opacity' }, 0.15);
      gsap.utils.toArray('.program-photo-frame').forEach(frame => {
        gsap.fromTo(frame, { clipPath: 'inset(8% 0% 8% 0% round 16px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: frame, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });
      gsap.fromTo('.gallery-photo-frame', { clipPath: 'inset(16% 0% 16% 0% round 12px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 12px)', ease: 'none',
        scrollTrigger: { trigger: '.gallery-layout', start: 'top 90%', end: 'top 40%', scrub: true, invalidateOnRefresh: true },
      });
      gsap.fromTo('.gallery-photo-frame img', { scale: 1.14 }, { scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.gallery-photo-frame', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
      gsap.from('.gallery-preview-photo figcaption', { x: 16, opacity: 0.3, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: entering('.gallery-layout', 'top 65%') });
      gsap.utils.toArray('.achievement-photo').forEach((photo, index) => {
        gsap.from(photo, { clipPath: 'inset(0% 0% 28% 0% round 12px)', y: 24, duration: 0.95, delay: index * 0.12, ease: 'power3.out', scrollTrigger: entering('.achievement-grid') });
      });
      gsap.from('.faq-contact-photo', { scale: 1.1, duration: 1.1, ease: 'power3.out', clearProps: 'transform', scrollTrigger: entering('.faq-section') });

      const films = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: entering('.academy-films') });
      films.from('.films-intro h2', { clipPath: 'inset(0% 0% 100% 0%)', y: 24, duration: 0.75 }, 0)
        .from('.films-intro > p, .films-intro > a, .films-note', { opacity: 0.3, y: 18, duration: 0.65, stagger: 0.07 }, 0.12)
        .from('.academy-film', { y: 70, rotationY: -12, rotationZ: -2, scale: 0.93, opacity: 0.3, duration: 0.9, stagger: 0.13 }, 0.1);

      const game = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: entering('#the-point', 'top 80%') });
      game.from('.rally-intro', { x: -38, opacity: 0.25, duration: 0.8 }, 0)
        .from('.rally-stage', { clipPath: 'inset(12% 4% 8% 4%)', opacity: 0.3, duration: 0.95 }, 0.12)
        .from('.rally-narrative', { x: -26, opacity: 0.3, duration: 0.7 }, 0.25)
        .from('.rally-bottom', { y: 18, opacity: 0.35, duration: 0.65 }, 0.35);

      const courtLines = document.querySelectorAll('.court-lines > *');
      courtLines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', scrollTrigger: entering('.play-formats') });
      });
      gsap.fromTo('.intro-statement > svg', { rotation: -35 }, { rotation: 35, ease: 'none',
        scrollTrigger: { trigger: '#academy', start: 'top bottom', end: 'bottom top', scrub: true } });

      const onAnchor = (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest('a[href^="#"]');
        if (!link || link.hasAttribute('download') || link.target === '_blank') return;
        const hash = link.getAttribute('href');
        const destination = document.getElementById(hash.slice(1));
        if (!destination) return;
        event.preventDefault();
        if (location.hash !== hash) history.pushState(null, '', hash);
        lenis.scrollTo(destination, { offset: 0, duration: 0.85,
          immediate: link.classList.contains('skip-link'),
          onComplete: () => {
            const temporary = !destination.hasAttribute('tabindex');
            if (temporary) destination.setAttribute('tabindex', '-1');
            destination.focus({ preventScroll: true });
            if (temporary) destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
          },
        });
      };
      const stopWhenHidden = () => document.hidden ? lenis.stop() : lenis.start();
      document.addEventListener('click', onAnchor);
      document.addEventListener('visibilitychange', stopWhenHidden);
      let alive = true;
      document.fonts.ready.then(() => { if (alive) { ScrollTrigger.refresh(); hero.play(0); } });
      return () => {
        alive = false;
        document.removeEventListener('click', onAnchor);
        document.removeEventListener('visibilitychange', stopWhenHidden);
        gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        if (activeScroller === lenis) activeScroller = null;
        document.documentElement.classList.remove('has-site-motion');
        gsap.ticker.lagSmoothing(500, 33);
      };
    });
    return () => media.revert();
  }, []);
}

export function useSelectionMotion(ref, selection, selectors) {
  const previous = useRef(selection);
  useLayoutEffect(() => {
    if (previous.current === selection) return;
    previous.current = selection;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current.querySelectorAll(selectors), { opacity: 0.3, x: 24 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' });
    });
    return () => media.revert();
  }, [ref, selection, selectors]);
}
