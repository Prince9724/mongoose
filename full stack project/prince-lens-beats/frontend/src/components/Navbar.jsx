import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Music, Home, User, Mail, Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'Music', path: '/music', icon: Music },
    { name: 'About', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cardBg/80 backdrop-blur-md border-b border-cardBorder py-3 shadow-xl'
          : 'bg-gradient-to-b from-darkBg/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neonPink to-neonCyan p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center">
                <span className="font-bebas text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-neonPink transition-colors">
                PRINCE <span className="text-neonCyan">LENS & BEATS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                Visual & Sonic Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-neonPink to-pink-600 text-white shadow-lg shadow-neonPink/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className={isActive(link.path) ? 'text-white' : 'text-neonCyan'} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Admin Dashboard CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <Link
              to="/admin"
              className="hidden lg:flex items-center space-x-1.5 border border-neonCyan/40 hover:border-neonCyan text-neonCyan hover:bg-neonCyan/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-neonCyan/20"
            >
              <Shield size={14} />
              <span>Admin Panel</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-cardBg border border-cardBorder text-slate-300 hover:text-white hover:border-neonPink transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cardBorder px-4 pt-3 pb-6 space-y-2 mt-3 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive(link.path) ? 'text-white' : 'text-neonCyan'} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full border border-neonCyan text-neonCyan py-2.5 rounded-xl font-medium text-sm"
            >
              <Shield size={16} />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
