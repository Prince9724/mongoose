import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Music, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-darkBg border-t border-cardBorder pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-neonPink to-neonCyan p-0.5">
                <div className="w-full h-full bg-darkBg rounded-[7px] flex items-center justify-center">
                  <span className="font-bebas text-xl text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">P</span>
                </div>
              </div>
              <span className="font-bebas text-2xl tracking-wider text-white">
                PRINCE <span className="text-neonCyan">LENS & BEATS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
              Combining cinematic editorial photography and original electronic music production. Delivering high-impact visual and auditory stories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wide mb-4">EXPLORE PORTFOLIO</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/gallery" className="hover:text-neonPink transition-colors">Photography Gallery</Link></li>
              <li><Link to="/music" className="hover:text-neonCyan transition-colors">Music & Discography</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Biography & Equipment</Link></li>
              <li><Link to="/contact" className="hover:text-neonPink transition-colors">Bookings & Inquiries</Link></li>
            </ul>
          </div>

          {/* Admin & Legal */}
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wide mb-4">STUDIO DASHBOARD</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/admin" className="hover:text-neonCyan transition-colors">Admin Panel Access</Link></li>
              <li><span className="text-slate-600">Privacy Policy</span></li>
              <li><span className="text-slate-600">Terms of Licensing</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cardBorder/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Prince Lens & Beats. Built with MERN Architecture.</p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-cardBg border border-cardBorder text-slate-400 hover:text-white hover:border-neonPink transition-all"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
