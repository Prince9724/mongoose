import React, { useState } from 'react';
import { sendContactForm } from '../services/api';
import { Mail, Send, CheckCircle2, AlertCircle, Phone, MapPin, Instagram, Youtube, Music } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Photography Booking',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    const res = await sendContactForm(formData);
    setLoading(false);
    if (res.success) {
      setStatus({ type: 'success', message: res.message || 'Booking inquiry received! We will respond within 24 hours.' });
      setFormData({ name: '', email: '', subject: 'Photography Booking', message: '' });
    } else {
      setStatus({ type: 'error', message: res.error || 'Failed to submit form.' });
    }
  };

  return (
    <section className="py-20 bg-darkBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neonPink/10 text-neonPink text-xs font-semibold uppercase tracking-wider mb-4 border border-neonPink/30">
            <Mail size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide mb-4">
            LET'S CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">SOMETHING EPIC</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Available for editorial photography shoots, wedding commissions, music production, and commercial soundtrack licensing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 glass-panel p-8 rounded-3xl border border-cardBorder">
            <h3 className="font-bebas text-3xl text-white tracking-wide mb-6">STUDIO DIRECTORY</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-neonPink/10 text-neonPink border border-neonPink/30">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Email Inquiry</span>
                  <a href="mailto:contact@princelensbeats.com" className="text-slate-200 hover:text-neonPink transition-colors font-medium">
                    contact@princelensbeats.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-neonCyan/10 text-neonCyan border border-neonCyan/30">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Phone / WhatsApp</span>
                  <span className="text-slate-200 font-medium">+1 (555) 839-2019</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Studio Location</span>
                  <span className="text-slate-200 font-medium">Los Angeles • Tokyo • Remote</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-cardBorder">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">Connect Socially</span>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-neonPink' },
                  { icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' },
                  { icon: Music, href: 'https://spotify.com', color: 'hover:text-neonCyan' },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-3 rounded-xl bg-darkBg border border-cardBorder text-slate-400 ${social.color} transition-all duration-300 hover:scale-105`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-cardBorder shadow-2xl">
            <h3 className="font-bebas text-3xl text-white tracking-wide mb-6">BOOKING & INQUIRY FORM</h3>

            {status.message && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start space-x-3 text-sm border ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-darkBg/80 border border-cardBorder text-white focus:outline-none focus:border-neonPink transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-darkBg/80 border border-cardBorder text-white focus:outline-none focus:border-neonPink transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Inquiry Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-darkBg/80 border border-cardBorder text-white focus:outline-none focus:border-neonCyan transition-colors text-sm"
                >
                  <option value="Photography Booking">Photography Booking</option>
                  <option value="Wedding Commission">Wedding Commission</option>
                  <option value="Music Production & Beats">Music Production & Beats</option>
                  <option value="Film Scoring / Licensing">Film Scoring / Licensing</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, dates, location, or audio specifications..."
                  className="w-full px-4 py-3 rounded-xl bg-darkBg/80 border border-cardBorder text-white focus:outline-none focus:border-neonPink transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold text-base shadow-xl shadow-neonPink/30 hover:shadow-neonPink/50 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Booking Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
