import React from 'react';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-bebas text-6xl text-white tracking-wide mb-2">
          ABOUT <span className="text-neonPink">THE CREATOR</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Learn about the creative philosophy, studio gear, camera lenses, and production tools driving Prince Lens & Beats.
        </p>
      </div>
      <About />
    </div>
  );
};

export default AboutPage;
