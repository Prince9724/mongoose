import React from 'react';
import { Camera, Music, Award, Cpu, CheckCircle } from 'lucide-react';

const About = () => {
  const gearItems = [
    { name: 'Sony A7IV & Canon EOS R5', category: 'Cameras' },
    { name: '85mm f/1.4 GM, 35mm f/1.4 L', category: 'Lenses' },
    { name: 'Profoto B10X & A10 Flash', category: 'Lighting' },
    { name: 'Ableton Live 12 Suite & Universal Audio', category: 'Music Gear' },
  ];

  return (
    <section className="py-20 bg-darkBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Creator Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden glass-panel border border-cardBorder p-3 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                alt="Prince Creator Portrait"
                className="w-full h-[480px] object-cover rounded-2xl filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <span className="text-xs uppercase tracking-widest text-neonCyan font-semibold">Founder & Creator</span>
                <h3 className="font-bebas text-4xl text-white tracking-wide">PRINCE LENS & BEATS</h3>
              </div>
            </div>
            {/* Ambient Background Glow */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-neonPink/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neonPink/10 text-neonPink text-xs font-semibold uppercase tracking-wider border border-neonPink/30">
              <Award size={14} />
              <span>Creative Philosophy</span>
            </div>

            <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide leading-tight">
              WHERE LIGHT FREQUENCIES MEET <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">HYPNOTIC RHYTHMS</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              I am a dual-discipline artist merging high-concept visual photography with electronic music production. My work explores contrast, mood, light dynamics, and sonic atmosphere.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether directing fashion editorial shoots or composing soundtrack scores for commercials and films, my goal is to deliver an unforgettable sensory impact.
            </p>

            {/* Studio Gear Grid */}
            <div className="pt-4">
              <h4 className="font-bebas text-2xl text-white tracking-wide mb-4 flex items-center space-x-2">
                <Cpu size={20} className="text-neonCyan" />
                <span>STUDIO EQUIPMENT & GEAR</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gearItems.map((item, idx) => (
                  <div key={idx} className="glass-panel p-3.5 rounded-xl border border-cardBorder flex items-center space-x-3">
                    <CheckCircle size={16} className="text-neonPink flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                      <span className="text-sm font-medium text-slate-200">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
