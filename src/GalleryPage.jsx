import QualityImage from './QualityImage.jsx';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Brand, Header } from './App.jsx';
import GalleryViewer from './GalleryViewer.jsx';
import GalleryIcon from './GalleryIcon.jsx';
import { FEATURED_PHOTO, GALLERY_CATEGORIES, GALLERY_PHOTOS, categoryFor, galleryCategoryFromHash } from './gallery-content.js';

export default function GalleryPage() {
  const root = useRef(null), anchor = useRef(null), filterBar = useRef(null), photoGrid = useRef(null), opener = useRef(null), pendingScroll = useRef(false);
  const [category, setCategory] = useState(() => galleryCategoryFromHash(location.hash));
  const [viewer, setViewer] = useState(null);
  const [collectionWidth, setCollectionWidth] = useState(() => Math.max(240, window.innerWidth - 112));
  const currentCategory = categoryFor(category);
  const photos = useMemo(() => category === 'all-pictures' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(photo => photo.category === category), [category]);
  const photoRows = useMemo(() => {
    const rows = [], maximum = collectionWidth > 900 ? 3 : 2;
    const gap = collectionWidth > 650 ? 24 : 14;
    const minimum = collectionWidth > 650 ? 180 : Math.min(110, (collectionWidth - gap) / 2);
    for (let index = 0; index < photos.length;) {
      const remaining = photos.length - index;
      // Share four remaining pictures across two complete rows, avoiding a
      // lone portrait stretched across a desktop-width final row.
      let count = maximum === 3 && remaining === 4 ? 2 : Math.min(maximum, remaining);
      let row = photos.slice(index, index + count);
      const fits = items => {
        const ratios = items.map(photo => photo.width / photo.height);
        const total = ratios.reduce((sum, value) => sum + value, 0);
        return Math.min(...ratios) / total * (collectionWidth - gap * (items.length - 1)) >= minimum;
      };
      while (row.length > 1 && !fits(row)) row = row.slice(0, -1);
      rows.push(row);
      index += row.length;
    }
    return rows;
  }, [photos, collectionWidth]);
  useLayoutEffect(() => {
    const resize = new ResizeObserver(([entry]) => setCollectionWidth(Math.round(entry.contentRect.width)));
    resize.observe(photoGrid.current);
    return () => resize.disconnect();
  }, []);
  const counts = useMemo(() => Object.fromEntries(GALLERY_CATEGORIES.map(item => [item.id, item.id === 'all-pictures' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter(photo => photo.category === item.id).length])), []);
  const scrollToCollection = useCallback((immediate = false) => {
    anchor.current?.scrollIntoView({ block: 'start', behavior: immediate || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, []);
  useEffect(() => {
    let alive = true;
    const isCategoryHash = () => [...GALLERY_CATEGORIES.map(item => item.id), 'academy-photos', 'training-photos', 'tournaments', 'champions'].includes(location.hash.slice(1));
    const syncHash = () => { if (!isCategoryHash()) return; pendingScroll.current = true; setCategory(galleryCategoryFromHash(location.hash)); scrollToCollection(true); };
    if (isCategoryHash()) document.fonts.ready.then(() => { if (alive) scrollToCollection(true); });
    window.addEventListener('hashchange', syncHash);
    const resize = new ResizeObserver(() => root.current?.style.setProperty('--gallery-dock-height', `${filterBar.current.getBoundingClientRect().height}px`));
    resize.observe(filterBar.current);
    return () => { alive = false; resize.disconnect(); window.removeEventListener('hashchange', syncHash); };
  }, [scrollToCollection]);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.gallery-arrival-copy > *', { y: 22, opacity: 0.5, duration: 0.8, stagger: 0.08, ease: 'expo.out', clearProps: 'opacity,transform' });
        gsap.fromTo('.gallery-feature-image', { clipPath: 'inset(6% 0% 6% 0% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useLayoutEffect(() => {
    if (pendingScroll.current) { pendingScroll.current = false; scrollToCollection(true); }
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const animation = gsap.fromTo(photoGrid.current.querySelectorAll('.gallery-item'), { opacity: 0.45, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: { amount: 0.18 }, ease: 'expo.out', clearProps: 'opacity,transform' });
      return () => animation.revert();
    });
    return () => media.revert();
  }, [category, scrollToCollection, photoRows]);
  const selectCategory = id => {
    history.replaceState(null, '', `#${id}`);
    if (id === category) return scrollToCollection();
    pendingScroll.current = true;
    setCategory(id);
  };
  const openPhoto = (photo, event, collection = photos) => { opener.current = event.currentTarget; setViewer({ photos: collection, index: collection.findIndex(item => item.id === photo.id) }); };
  const closePhoto = useCallback(() => { setViewer(null); opener.current?.focus({ preventScroll: true }); }, []);
  const movePhoto = useCallback(step => setViewer(current => current && ({ ...current, index: (current.index + step + current.photos.length) % current.photos.length })), []);
  return <div ref={root} className="gallery-page gallery-page--curated" id="home">
    <a className="skip-link" href="#gallery-main">Skip to gallery</a><Header galleryPage />
    <main id="gallery-main">
      <section className="gallery-arrival section-wrap" aria-labelledby="gallery-page-heading">
        <div className="gallery-arrival-copy"><a className="text-link gallery-home-link" href="/"><GalleryIcon name="previous" size={16} /> Back to the academy</a><h1 id="gallery-page-heading">Life at ATB.<br /><em>In every frame.</em></h1><p>The early starts. The shared rallies. The moments worth keeping. Step a little closer to our world.</p><a className="text-link gallery-browse-link" href="#gallery-browser">Explore the pictures <GalleryIcon name="down" size={18} /></a></div>
        <figure className="gallery-featured-moment"><button className="gallery-feature-image" aria-label={`Open photo: ${FEATURED_PHOTO.title}`} onClick={event => openPhoto(FEATURED_PHOTO, event, GALLERY_PHOTOS)}><QualityImage src={FEATURED_PHOTO.src} alt={FEATURED_PHOTO.alt} width={FEATURED_PHOTO.width} height={FEATURED_PHOTO.height} fetchPriority="high" /><span className="gallery-expand"><GalleryIcon /></span></button><figcaption><span>On court. In good company.</span><span>ATB Tennis Academy · Yelahanka</span></figcaption></figure>
      </section>
      <div ref={anchor} id="gallery-browser" className="gallery-browser-anchor" />
      <nav ref={filterBar} className="gallery-category-dock" aria-label="Filter gallery"><div className="section-wrap gallery-category-inner"><div className="gallery-category-buttons">{GALLERY_CATEGORIES.map(item => <button key={item.id} type="button" className="gallery-category-button" aria-pressed={category === item.id} aria-controls="gallery-collection" onClick={() => selectCategory(item.id)}>{item.label}<span>{String(counts[item.id]).padStart(2, '0')}</span></button>)}</div><span className="gallery-dock-note">A closer look at ATB.</span></div></nav>
      <section id="gallery-collection" className={`gallery-collection section-wrap gallery-collection--${category}`} aria-labelledby="collection-heading">
        <div className="gallery-collection-heading"><div><h2 id="collection-heading">{currentCategory.title}</h2><p>{currentCategory.description}</p></div><p className="gallery-result-count" role="status" aria-live="polite" aria-atomic="true">{photos.length} photographs <span>· {currentCategory.label}</span></p></div>
        <div ref={photoGrid} className="gallery-editorial-grid">{photoRows.map(row => <div key={row[0].id} className="gallery-photo-row" style={{ gridTemplateColumns: row.map(photo => `${photo.width / photo.height}fr`).join(' ') }}>{row.map(photo => <figure key={photo.id} className="gallery-item"><button className="gallery-photo-image" style={{ aspectRatio: `${photo.width} / ${photo.height}` }} aria-label={`Open photo: ${photo.title}${photo.caption ? ` — ${photo.caption}` : ''}`} onClick={event => openPhoto(photo, event)}><QualityImage src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) calc(100vw - 48px), 50vw" style={{ objectPosition: photo.position || 'center 50%' }} loading="lazy" decoding="async" /><span className="gallery-expand"><GalleryIcon size={18} /></span></button><figcaption><h3>{photo.title}</h3>{photo.caption && <p className="gallery-photo-result">{photo.caption}</p>}<p>{categoryFor(photo.category).label}</p></figcaption></figure>)}</div>)}</div>
      </section>
      <section className="gallery-archive-notes section-wrap" aria-label="Academy result updates"><details><summary>From the ATB archive <span>Player highlights &amp; tournament notes <GalleryIcon name="down" size={18} /></span></summary><div className="gallery-archive-copy"><p><strong>Sehaj Singh</strong> · ITF J60 singles champion, Dehradun. Back-to-back titles and a ten-match winning streak. <a href="https://www.instagram.com/p/DHiOmqEv7tQ/" target="_blank" rel="noopener noreferrer">March 2025 update</a></p><p><strong>Eshita Sriyala</strong> · NS U14 singles champion in Coimbatore. <a href="https://www.instagram.com/p/DMIlS0avqN0/" target="_blank" rel="noopener noreferrer">July 2025 update</a></p><p><strong>Zeba</strong> · Singles winner and mixed-doubles runner-up at ITF World Masters MT200, Jaipur. <a href="https://www.instagram.com/p/DdyRUrFvFkd/" target="_blank" rel="noopener noreferrer">September 2026 update</a></p><p><strong>ATB Tennis Open</strong> · ATB’s 2024 men’s AITA tournament brought together more than 140 entries from across India. <a href="https://www.instagram.com/p/C5JPoDkPDiu/" target="_blank" rel="noopener noreferrer">Tournament update</a></p></div></details></section>
      <section className="gallery-invitation section-wrap" aria-labelledby="gallery-invitation-heading"><div><h2 id="gallery-invitation-heading">Your next memory<br />could start here.</h2><p>Come for a game. Stay part of the story.</p></div><a className="button button-lime" href="/#booking">Make time for tennis <GalleryIcon name="arrow" size={20} /></a></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><Brand footer homeHref="/#home" /><p>About The Best.<br />On and off court.</p><a className="text-link" href="/">Back to the academy</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ATB Tennis Academy</span><a href="#home">Back to the top</a></div></footer>
    <GalleryViewer viewer={viewer} onClose={closePhoto} onMove={movePhoto} />
  </div>;
}

