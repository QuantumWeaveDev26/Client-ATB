import { useEffect, useRef, useState } from 'react';
import GalleryIcon from './GalleryIcon.jsx';
import { categoryFor } from './gallery-content.js';

export default function GalleryViewer({ viewer, onClose, onMove }) {
  const dialog = useRef(null);
  const touch = useRef(null);
  const [loadedId, setLoadedId] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const open = Boolean(viewer);
  const photo = viewer?.photos[viewer.index];
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    const keyboard = event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); onMove(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); onMove(-1); }
    };
    element.addEventListener('keydown', keyboard);
    return () => { element.removeEventListener('keydown', keyboard); element.close(); document.body.style.overflow = overflow; };
  }, [open, onMove]);
  useEffect(() => {
    if (!viewer || navigator.connection?.saveData) return;
    const preload = new Image();
    preload.decoding = 'async';
    preload.src = viewer.photos[(viewer.index + 1) % viewer.photos.length].full;
  }, [viewer]);
  const finishSwipe = event => {
    if (!touch.current || !event.changedTouches.length) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touch.current.x, dy = point.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) onMove(dx < 0 ? 1 : -1);
  };
  return <dialog ref={dialog} className="atb-gallery-viewer" aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); onClose(); }} onClose={onClose}>
    {photo && <div className="gallery-viewer-layout">
      <header className="gallery-viewer-header"><div><h2 id="viewer-title">{photo.title}</h2><p>{categoryFor(photo.category).label}</p></div><div className="gallery-viewer-actions"><span className="gallery-viewer-counter" aria-live="polite" aria-atomic="true">{String(viewer.index + 1).padStart(2, '0')} / {String(viewer.photos.length).padStart(2, '0')}</span><button className="gallery-viewer-close" onClick={onClose} aria-label="Close photo"><GalleryIcon name="close" size={24} /></button></div></header>
      <div className="gallery-viewer-stage" onTouchStart={event => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={finishSwipe} onTouchCancel={() => { touch.current = null; }}>
        <button className="gallery-viewer-previous" aria-label="Previous photo" onClick={() => onMove(-1)}><GalleryIcon name="previous" size={28} /></button>
        <img key={`${photo.id}-${attempt}`} className={loadedId === photo.id ? 'is-loaded' : ''} src={photo.full} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" onLoad={() => { setLoadedId(photo.id); setErrorId(null); }} onError={() => setErrorId(photo.id)} />
        {loadedId !== photo.id && errorId !== photo.id && <span className="gallery-viewer-loading" role="status">Loading photo…</span>}
        {errorId === photo.id && <div className="gallery-viewer-error" role="alert"><p>This photo couldn’t load.</p><button onClick={() => { setLoadedId(null); setErrorId(null); setAttempt(value => value + 1); }}>Try again</button></div>}
        <button className="gallery-viewer-next" aria-label="Next photo" onClick={() => onMove(1)}><GalleryIcon name="next" size={28} /></button>
      </div>
      <footer className="gallery-viewer-footer"><p>{photo.caption || photo.description || 'ATB Tennis Academy · Yelahanka, Bengaluru'}</p>{photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.sourceLabel} <GalleryIcon name="arrow" size={16} /></a> : <span>Use the arrows or swipe to explore.</span>}</footer>
    </div>}
  </dialog>;
}
