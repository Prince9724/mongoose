import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Music, Play, ArrowRight, Disc } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=80"
          alt="Studio Ambient Background"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-darkBg via-transparent to-darkBg/90" />
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonPink/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonCyan/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-neonPink/30 text-neonPink text-xs font-semibold tracking-wider uppercase mb-8 shadow-lg shadow-neonPink/10 animate-bounce">
          <Disc size={14} className="animate-spin text-neonCyan" />
          <span>Visual Storyteller & Sonic Architect</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white mb-6 leading-none drop-shadow-2xl">
          PRINCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-purple-500 to-neonCyan">LENS & BEATS</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light mb-10 leading-relaxed">
          Crafting high-fashion cinematic photography and modern sonic experiences. Capturing light frequencies and weaving hypnotic beats into timeless art.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold text-base shadow-xl shadow-neonPink/25 hover:shadow-neonPink/40 hover:scale-105 transition-all duration-300 group"
          >
            <Camera size={20} className="group-hover:rotate-12 transition-transform" />
            <span>View Gallery</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/music"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl glass-panel border border-neonCyan/40 hover:border-neonCyan text-neonCyan hover:text-white hover:bg-neonCyan/10 font-semibold text-base shadow-lg shadow-neonCyan/10 hover:scale-105 transition-all duration-300 group"
          >
            <Play size={20} className="fill-current text-neonCyan group-hover:scale-110 transition-transform" />
            <span>Listen Music</span>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Photos Taken', value: '500+' },
            { label: 'Beats Produced', value: '120+' },
            { label: 'Exhibitions', value: '18' },
            { label: 'Global Clients', value: '45+' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-cardBorder/60 hover:border-neonPink/40 transition-colors">
              <span className="block font-bebas text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
