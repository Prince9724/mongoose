import React from 'react';
import MusicPlayer from '../components/MusicPlayer';

const MusicPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-bebas text-6xl text-white tracking-wide mb-2">
          FULL <span className="text-neonCyan">DISCOGRAPHY</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Listen to original electronic compositions, synthwave singles, and film scores. Integrated audio streaming and spectrum visualizer.
        </p>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default MusicPage;
