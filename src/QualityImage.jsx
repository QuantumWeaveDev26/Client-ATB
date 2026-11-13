import { qualityPhotoProps } from './photo-quality.js';

export default function QualityImage({ src, sizes, ...props }) {
  const displaySize = sizes || (props.className?.includes('hero-photo') ? '100vw' : '(max-width: 760px) calc(100vw - 48px), 50vw');
  return <img src={src} {...qualityPhotoProps(src, displaySize)} {...props} />;
}
