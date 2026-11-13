import QualityImage from './QualityImage.jsx';
import { useEffect, useRef, useState } from 'react';
import SiteIcon from './SiteIcon.jsx';
import { FOUNDERS } from './academy-content.js';

function FounderPhotos({ founder }) {
  const frame = useRef(null);
  const images = useRef([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    let live = true;
    Promise.all(images.current.map(image => image.decode())).then(() => { if (live) setReady(true); }).catch(() => {});
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(frame.current);
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(query.matches);
    const syncVisibility = () => setHidden(document.hidden);
    query.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => { live = false; observer.disconnect(); query.removeEventListener('change', syncMotion); document.removeEventListener('visibilitychange', syncVisibility); };
  }, []);
  useEffect(() => {
    if (!ready || !visible || hidden || paused || reduced) return;
    const timer = setInterval(() => setActive(index => (index + 1) % founder.images.length), 5500);
    return () => clearInterval(timer);
  }, [ready, visible, hidden, paused, reduced, founder.images.length]);
  return <div ref={frame} className="founder-slideshow" role="region" aria-roledescription="carousel" aria-label="Mentor photographs">
    <div className="founder-photo-stack">{founder.images.map((photo, index) => <QualityImage ref={element => { images.current[index] = element; }} key={photo.src} src={photo.src} alt={photo.alt} width="1100" height="1100" decoding="async" aria-hidden={active !== index} className={active === index ? 'is-active' : ''} style={{ objectPosition: photo.position }} />)}</div>
    <div className="founder-photo-controls"><div className="founder-photo-dots">{founder.images.map((photo, index) => <button type="button" key={photo.src} aria-label={`Show mentor photo ${index + 1}`} aria-pressed={index === active} onClick={() => { setActive(index); setPaused(true); }}><span /></button>)}</div><span aria-hidden="true">{String(active + 1).padStart(2, '0')} / 02</span>{!reduced && <button type="button" className="founder-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play mentor slideshow' : 'Pause mentor slideshow'}>{paused ? 'Play' : 'Pause'}<SiteIcon name={paused ? 'play' : 'pause'} size={16} /></button>}</div>
  </div>;
}

export default function Founders() {
  return <section id="founders" className="founders-section section-wrap" aria-labelledby="founders-heading">
    <div className="founders-heading"><h2 id="founders-heading">A lifetime in tennis.<br />A vision for yours.</h2></div>
    <div className="founder-profiles">{FOUNDERS.map(founder => <article className="founder-profile" key={founder.id}>
      <FounderPhotos founder={founder} />
      <div className="founder-biography"><h3>{founder.name}</h3><span className="founder-role">{founder.role}</span><p>{founder.biography}</p><p>{founder.story}</p><dl className="founder-milestones">{founder.milestones.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl><a className="text-link" href="/programs.html">Find your training path <SiteIcon size={18} /></a></div>
    </article>)}</div>
  </section>;
}
