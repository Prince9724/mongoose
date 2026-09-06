import React from 'react';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-bebas text-6xl text-white tracking-wide mb-2">
          PHOTOGRAPHY <span className="text-neonPink">COLLECTION</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Browse the complete portfolio of editorial, wedding, street, and nature photography. Click any frame to inspect full-screen metadata.
        </p>
      </div>
      <Gallery />
    </div>
  );
};

export default GalleryPage;
