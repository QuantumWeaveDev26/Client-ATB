import QualityImage from './QualityImage.jsx';
import { useEffect, useRef, useState } from 'react';
import TennisExperience from './TennisExperience.jsx';
import Founders from './Founders.jsx';
import Booking from './Booking.jsx';
import ProgramsOverview from './ProgramsOverview.jsx';
import GalleryPreview from './GalleryPreview.jsx';
import BallJourney from './BallJourney.jsx';
import AcademyVideos from './AcademyVideos.jsx';
import { scrollToSection, useSiteMotion } from './useSiteMotion.js';
import { indiaDate, MAP_URL, whatsappUrl } from './booking.js';

function Icon({ name = 'arrow', size = 20, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    northeast: <><path d="M6 18 18 6M6 6h12v12" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chevron: <path d="m8 4 8 8-8 8" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    ball: <><circle cx="12" cy="12" r="9" /><path d="M5.5 5.5c7 1 6 12 13 13M18.5 5.5c-7 1-6 12-13 13" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function Brand({ footer = false, homeHref = '#home' }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href={homeHref} aria-label="ATB Tennis Academy home">
    <QualityImage src="/images/atb-logo.webp" alt="" width="84" height="84" />
    <span className="brand-word"><span className="brand-initials">ATB</span><span className="brand-academy">Academy</span><span className="brand-name">ABOUT THE BEST TENNIS</span></span>
  </a>;
}

function Header({ galleryPage = false, programsPage = false }) {
  const innerPage = galleryPage || programsPage;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    if (open) setHidden(false);
    const update = () => {
      frame = 0;
      // Clamp elastic overscroll so reaching either edge cannot fake a reversal.
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = Math.max(0, Math.min(window.scrollY, maximum));
      const delta = currentY - previousY;
      const keyboardFocus = header.current?.contains(document.activeElement)
        && document.activeElement.matches(':focus-visible');
      if (open || keyboardFocus || currentY <= (header.current?.offsetHeight ?? 100) + 16) setHidden(false);
      else if (delta < -0.5) setHidden(false);
      else if (delta > 0.5) setHidden(true);
      previousY = currentY;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onKeyboard = (event) => { if (event.key === 'Tab') setHidden(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyboard);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyboard);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <><header ref={header} className={`site-header${hidden ? ' is-hidden' : ''}`} inert={hidden ? '' : undefined} onFocusCapture={() => setHidden(false)}>
    <Brand homeHref={innerPage ? '/#home' : '#home'} />
    <button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={25} /></button>
    <nav id="main-navigation" className={`main-navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation" data-lenis-prevent={open ? '' : undefined} onClick={(event) => { if (event.target.closest('a')) setOpen(false); }}>
      <a href={innerPage ? '/#founders' : '#founders'}>Our mentor</a><a href={innerPage ? '/#the-point' : '#the-point'}>Feel the game</a><a href="/programs.html" aria-current={programsPage ? 'page' : undefined}>Programs</a><a href="/gallery.html" aria-current={galleryPage ? 'page' : undefined}>Gallery</a><a href={innerPage ? '/#visit' : '#visit'}>Visit us</a>
      <a href={innerPage ? '/#booking' : '#booking'} className="button button-lime nav-action">Request a slot <Icon name="northeast" size={18} /></a>
    </nav>
  </header><div className="site-header-spacer" aria-hidden="true" /></>;
}

function Achievements() {
  return <section id="champions" className="achievements section-wrap" aria-labelledby="champions-heading">
    <div className="section-heading"><h2 id="champions-heading">Tournaments &amp;<br />achievements.</h2><div><p>Real players. Memorable milestones.<br />A few moments we’re proud to share.</p><a className="text-link" href="https://www.instagram.com/atb_tennisacademy/" target="_blank" rel="noopener noreferrer">Follow the journey<Icon name="instagram" size={18} /></a></div></div>
    <div className="achievement-grid">
      <article className="achievement"><a className="achievement-photo" href="https://www.instagram.com/p/DHiOmqEv7tQ/" target="_blank" rel="noopener noreferrer" aria-label="Read the academy’s post about Sehaj’s ITF J60 title"><QualityImage src="/images/enhanced/sehaj-trophy.webp" alt="Sehaj with a tennis winner’s trophy" width="720" height="900" loading="lazy" /><span className="photo-link"><Icon name="northeast" /></span></a><div className="achievement-copy"><h3>Sehaj Singh</h3><p>ITF J60 singles champion, Dehradun. Back-to-back titles and a ten-match winning streak.</p><span>Shared by ATB · March 2025</span></div></article>
      <article className="achievement"><a className="achievement-photo" href="https://www.instagram.com/p/DMIlS0avqN0/" target="_blank" rel="noopener noreferrer" aria-label="Read the academy’s post about Eshita’s NS U14 title"><QualityImage src="/images/enhanced/eshita-trophy.webp" alt="Eshita holding a championship trophy" width="720" height="900" loading="lazy" /><span className="photo-link"><Icon name="northeast" /></span></a><div className="achievement-copy"><h3>Eshita</h3><p>NS U14 singles champion in Coimbatore. Another step in a determined junior tennis journey.</p><span>Shared by ATB · July 2025</span></div></article>
      <div className="achievement-notes"><Icon name="ball" size={50} /><h3>Big dreams.<br />Every age.</h3><p>From junior circuits to adult competitions, our community keeps finding new reasons to celebrate.</p><div className="result-note"><strong>Zeba</strong><span>Singles winner & mixed-doubles runner-up<br />ITF World Masters MT200, Jaipur</span><a href="https://www.instagram.com/p/DdyRUrFvFkd/" target="_blank" rel="noopener noreferrer">ATB’s September 2026 update<Icon name="northeast" size={15} /></a></div><div className="result-note"><strong>ATB Tennis Open</strong><span>Our 2024 men’s AITA tournament brought together more than 140 entries from across India.</span><a href="https://www.instagram.com/p/C5JPoDkPDiu/" target="_blank" rel="noopener noreferrer">Look back at the tournament<Icon name="northeast" size={15} /></a></div></div>
    </div>
  </section>;
}

const FAQS = [
  ['Can children and adults join coaching?', 'Yes. ATB offers personalised coaching across age groups. Tell the team about your age, experience and goals so they can advise on a suitable current batch.'],
  ['Can I book a court without joining coaching?', 'ATB has a court-booking listing on KheloMore. You can check that listing or use this page to request your preferred date.'],
  ['Does sending a request reserve my court?', 'The form opens WhatsApp with your details. Send the message there, and the academy will confirm availability and booking details with you. A request alone does not reserve a slot.'],
  ['What should I bring?', 'Bring your racquet, suitable tennis shoes, water and comfortable sportswear. If you need equipment, ask the academy about availability before your visit.'],
  ['How much are coaching and court sessions?', 'Please ask the academy for current pricing. Fees depend on the coaching or court session you choose; the team will confirm the details before you book.'],
  ['What happens if it rains?', 'The courts are outdoors. Check with the academy about weather conditions and the rescheduling or cancellation terms for your session before booking.'],
];

function App() {
  useSiteMotion();
  const [request, setRequest] = useState({ date: '', players: '2', name: '', notes: '' });
  const [heroDate, setHeroDate] = useState('');
  const bookingHeading = useRef(null);
  useEffect(() => {
    if (!location.hash) return;
    let live = true;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      if (!live) return;
      const target = document.getElementById(location.hash.slice(1));
      if (!target) return;
      scrollToSection(target);
      if (location.hash === '#booking') bookingHeading.current?.focus({ preventScroll: true });
    }));
    return () => { live = false; };
  }, []);
  const goToBooking = (changes = {}) => {
    setRequest((current) => ({ ...current, ...changes }));
    scrollToSection('#booking');
    bookingHeading.current?.focus({ preventScroll: true });
  };
  return <>
    <BallJourney />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div id="home" className="opening"><Header /><main id="main-content">
      <section className="hero" aria-labelledby="hero-heading"><QualityImage className="hero-photo" src="/images/enhanced/courts-hero-enhanced.webp" alt="Enhanced view of the outdoor clay courts at ATB Tennis Academy, Yelahanka" width="1448" height="1086" fetchPriority="high" /><div className="hero-shade" /><div className="hero-copy"><h1 id="hero-heading"><span className="hero-line"><span className="hero-line-inner">Good things</span></span>{' '}<span className="hero-line"><span className="hero-line-inner">start with</span></span>{' '}<span className="hero-line"><span className="hero-line-inner hero-line-accent">a first serve.</span></span></h1><p>Coaching. Competition. A court to call your own.<br className="desktop-break" />{' '}Find your game at ATB, Yelahanka.</p><div className="hero-actions"><a className="button button-lime" href={whatsappUrl("Hello ATB Tennis Academy! I'd like to book a trial session. Please share availability and trial details.")} target="_blank" rel="noopener noreferrer">Book a Trial<Icon name="northeast" size={19} /></a><a className="button hero-programs" href="/programs.html">Explore Programs<Icon name="arrow" size={19} /></a></div><a href={MAP_URL} className="hero-location" target="_blank" rel="noopener noreferrer"><Icon name="pin" size={17} />Outdoor clay courts · Yelahanka, Bengaluru<Icon name="northeast" size={14} /></a></div>
        <form className="hero-planner simple-hero-planner" onSubmit={event => { event.preventDefault(); goToBooking(heroDate ? { date: heroDate } : {}); }}><div className="hero-planner-intro"><strong>Make your next game happen.</strong><span>Choose a day. We’ll help with the rest.</span></div><label htmlFor="hero-date">Preferred day<input id="hero-date" name="date" aria-label="Preferred day" type="date" min={indiaDate()} value={heroDate} onChange={event => setHeroDate(event.target.value)} /></label><button type="submit" className="button button-lime">Request a slot<Icon name="northeast" size={19} /></button></form>
      </section>
      <Founders />
      <section id="academy" className="academy-intro academy-intro--photo section-wrap" aria-labelledby="academy-heading"><figure className="academy-community-photo"><QualityImage src="/images/gallery/atb-17.webp" alt="The ATB academy community standing together with racquets on the tree-lined clay courts in Yelahanka" width="4032" height="2268" sizes="(max-width: 760px) calc(100vw - 48px), (min-width: 1440px) 1296px, 91.2vw" loading="lazy" decoding="async" /></figure><div className="academy-intro-content"><div className="intro-statement"><Icon name="ball" size={32} /><h2 id="academy-heading">A little fresh air.<br />A lot of possibility.</h2></div><div className="intro-copy"><p>Tucked into the green surroundings of Yelahanka, ATB is a place to find your focus and your love for the game.</p><p>We bring together personalised coaching, purposeful practice and the simple pleasure of time on court. Come for the tennis. Stay for the feeling.</p><a className="text-link" href="#coaching">Find your starting point<Icon name="arrow" size={19} /></a></div></div></section>
      <TennisExperience />
      <ProgramsOverview />
      <GalleryPreview />

      <AcademyVideos />
      <Booking request={request} setRequest={setRequest} headingRef={bookingHeading} />
      <section id="questions" className="faq-section faq-section--contact section-wrap" aria-labelledby="faq-heading">
        <div id="visit" className="faq-contact">
          <QualityImage className="faq-contact-photo" src="/images/enhanced/courts-clay.jpg" alt="" width="1000" height="667" sizes="(max-width: 760px) calc(100vw - 48px), 50vw" loading="lazy" />
          <div className="faq-contact-content">
            <h2 id="faq-heading">Before you<br />step on court.</h2>
            <p className="faq-contact-intro">A few things you might be wondering.</p>
            <address><strong>ATB Tennis Academy</strong><br />BSF Campus, Yelahanka<br />Bengaluru, Karnataka 560064<span>Near Ali Estate · Plus code 4J83+GJ</span></address>
            <a href={MAP_URL} className="button button-lime" target="_blank" rel="noopener noreferrer">Get directions<Icon name="northeast" size={19} /></a>
            <div className="faq-contact-links"><a href="tel:+919187308508"><span>+91 91873 08508</span><Icon name="phone" size={18} /></a><a href="mailto:atbtennisacademy@gmail.com"><span>atbtennisacademy@gmail.com</span><Icon name="northeast" size={18} /></a></div>
          </div>
        </div>
        <div className="faq-list">{FAQS.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="chevron" size={18} /></summary><p>{answer}</p></details>)}</div>
      </section>
    </main></div>
    <footer id="page-end" className="site-footer"><div className="footer-main"><Brand footer /><p>More than a game.<br />A place to keep growing.</p><div className="footer-socials"><a href="https://www.instagram.com/atb_tennisacademy/" target="_blank" rel="noopener noreferrer">Instagram<Icon name="northeast" size={16} /></a><a href="https://www.facebook.com/profile.php?id=100091903486614" target="_blank" rel="noopener noreferrer">Facebook<Icon name="northeast" size={16} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ATB Tennis Academy</span><a href="#home">Back to the top<Icon name="arrow" size={16} className="up" /></a><span>About The Best. On and off court.</span></div></footer>
  </>;
}

export { Brand, Header, Achievements };
export default App;



