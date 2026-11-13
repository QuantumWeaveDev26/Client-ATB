import QualityImage from './QualityImage.jsx';
import PlayFormats from './PlayFormats.jsx';
import { GALLERY_PREVIEW } from './academy-content.js';

export default function GalleryPreview() {
  return <section id="gallery" className="gallery-section gallery-preview" aria-labelledby="gallery-heading"><div className="section-wrap">
    <div className="section-heading"><h2 id="gallery-heading">The academy,<br />in pictures.</h2><div><p>A glimpse of our courts, our players and everyday life at ATB.</p><a className="text-link" href="/gallery.html">View More <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></a></div></div>
    <div className="gallery-layout gallery-preview-grid">{GALLERY_PREVIEW.map((photo) => <figure className="gallery-preview-photo" key={photo.src}><a className="gallery-photo-frame" href={`/gallery.html#${photo.category}`} aria-label={`View the full gallery: ${photo.title}`}><QualityImage src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} style={{ objectPosition: photo.position }} loading="lazy" /></a><figcaption>{photo.title}{photo.caption && <p>{photo.caption}</p>}</figcaption></figure>)}</div>
    <div className="gallery-support"><div><h3>More moments.<br />More of ATB.</h3><p>Explore the full academy gallery, practice sessions, tournament moments and player milestones.</p><a className="button button-green" href="/gallery.html">View More <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></a></div><PlayFormats /></div>
  </div></section>;
}
