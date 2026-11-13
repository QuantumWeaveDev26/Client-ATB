import photos from './photo-quality-assets.json';

// Let the browser choose a light preview or the non-generatively enhanced 4K view.
export function qualityPhotoProps(src, sizes = '100vw') {
  const photo = photos[src];
  if (!photo) return {};
  return { srcSet: `${photo.src} ${photo.width}w, ${photo.full} ${photo.fullWidth}w`, sizes };
}
