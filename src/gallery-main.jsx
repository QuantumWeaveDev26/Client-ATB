import React from 'react';
import { createRoot } from 'react-dom/client';
import GalleryPage from './GalleryPage.jsx';
import './styles.css';
import './tennis-experience.css';
import './client-refinement.css';
import './brand-gallery.css';
import './viewport-sections.css';
import './gallery-editorial.css';
import './fixed-navbar.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><GalleryPage /></React.StrictMode>);
