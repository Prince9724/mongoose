import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import MusicPlayer from '../components/MusicPlayer';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main className="space-y-0">
      <Hero />
      <Gallery limit={6} />
      <MusicPlayer />
      <About />
      <Contact />
    </main>
  );
};

export default Home;
