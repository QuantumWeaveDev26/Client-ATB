import supplied from './gallery-assets.json';

export const GALLERY_CATEGORIES = [
  { id: 'all-pictures', label: 'All Pictures', title: 'A little of everything.', description: 'The courts, the people and the moments that bring us together.' },
  { id: 'academy-pictures', label: 'Academy Pictures', title: 'This is our kind of place.', description: 'Clay courts, shared practice and tournament memories. All part of life at ATB.' },
  { id: 'achievements', label: 'Achievements', title: 'Moments worth celebrating.', description: 'Proud smiles, player milestones and memories to take home.' },
];
const order = [39,25,38,1,21,15,30,24,16,31,5,22,27,13,32,17,6,33,8,28,20,34,3,23,35,26,2,36,9,18,37,4,7,10,11,12,14,19,29];
export const GALLERY_PHOTOS = order.map(id => supplied.find(photo => photo.id === `atb-${String(id).padStart(2, '0')}`));
GALLERY_PHOTOS.push(
  { id: 'archive-sehaj', src: '/images/polished/archive/sehaj-trophy.webp', full: '/images/polished-4k/archive/sehaj-trophy.webp', width: 720, height: 900, title: 'Sehaj Singh.', alt: 'Sehaj at a tennis trophy presentation', category: 'achievements', description: 'ITF J60 singles champion, Dehradun. Back-to-back titles and a ten-match winning streak.', sourceUrl: 'https://www.instagram.com/p/DHiOmqEv7tQ/', sourceLabel: 'Academy update · March 2025' },
  { id: 'archive-eshita', src: '/images/polished/archive/eshita-trophy.webp', full: '/images/polished-4k/archive/eshita-trophy.webp', width: 720, height: 900, title: 'Eshita Sriyala', caption: 'AITA National Series U14 girls’ singles champion · Coimbatore', alt: 'Eshita Sriyala holding her trophy and certificate at the AITA Under-14 Boys & Girls tournament in Coimbatore', category: 'achievements', description: 'NS U14 singles champion in Coimbatore.', sourceUrl: 'https://www.instagram.com/p/DMIlS0avqN0/', sourceLabel: 'Academy update · July 2025' },
  { id: 'archive-open', src: '/images/polished/archive/academy-event.webp', full: '/images/polished-4k/archive/academy-event.webp', width: 1080, height: 800, title: 'ATB Tennis Open · 2024.', alt: 'Players and organisers together at an ATB tournament presentation', category: 'academy-pictures', description: 'ATB’s 2024 men’s AITA tournament brought together more than 140 entries from across India.', sourceUrl: 'https://www.instagram.com/p/C5JPoDkPDiu/', sourceLabel: 'Look back at the tournament' },
);
export const FEATURED_PHOTO = supplied.find(photo => photo.id === 'atb-16');
export const GALLERY_PREVIEW_PHOTOS = [39,1,38,27].map(id => supplied.find(photo => photo.id === `atb-${String(id).padStart(2, '0')}`));
export const categoryFor = id => GALLERY_CATEGORIES.find(category => category.id === id) || GALLERY_CATEGORIES[0];
export function galleryCategoryFromHash(hash) {
  const aliases = { 'academy-photos': 'academy-pictures', 'training-photos': 'academy-pictures', tournaments: 'academy-pictures', champions: 'achievements' };
  const id = hash.replace(/^#/, '');
  return categoryFor(aliases[id] || id).id;
}
