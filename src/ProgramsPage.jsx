import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brand, Header } from './App.jsx';
import SiteIcon from './SiteIcon.jsx';
import ProgramGrid from './ProgramGrid.jsx';
gsap.registerPlugin(ScrollTrigger);

export default function ProgramsPage() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.programs-title, .programs-intro-copy', { y: 24, opacity: 0.35, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
        gsap.utils.toArray('.program-card').forEach(card => {
          gsap.from(card.querySelector('.program-card-photo img'), { scale: 1.08, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
          gsap.from(card.querySelector('.program-card-copy'), { y: 28, opacity: 0.4, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    if (!location.hash) return;
    let live = true;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (!live || !target) return;
      ScrollTrigger.refresh();
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      target.focus({ preventScroll: true });
    }));
    return () => { live = false; };
  }, []);
  return <div ref={root} className="programs-page" id="home"><a className="skip-link" href="#programs-main">Skip to programs</a><Header programsPage />
    <main id="programs-main"><section className="programs-intro section-wrap"><a className="text-link gallery-back" href="/">Back to the academy</a><h1 className="programs-title">Tennis programs.</h1><p className="programs-intro-copy">Seven ways to find your game. Explore coaching for young beginners, developing players and adults at ATB.</p></section>
    <section className="programs-catalogue section-wrap" aria-label="Tennis programs"><ProgramGrid detailed /></section>
    <section className="programs-guidance section-wrap"><div><h2>Let’s find your<br />starting point.</h2><p>Not sure which program fits? Tell the team about your age, playing experience and goals. Ask about current batches, fees and trial sessions.</p></div><a className="button button-green" href="https://wa.me/919187308508?text=Hello%20ATB%20Tennis%20Academy!%20Please%20help%20me%20choose%20a%20tennis%20program." target="_blank" rel="noopener noreferrer">Talk about your training <SiteIcon size={18} /></a></section></main>
    <footer className="site-footer"><div className="footer-main"><Brand footer homeHref="/" /><p>More than a game.<br />A place to keep growing.</p><a className="text-link" href="/gallery.html">Explore the gallery <SiteIcon size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ATB Tennis Academy</span><a href="#home">Back to the top <SiteIcon name="up" size={16} /></a></div></footer>
  </div>;
}
