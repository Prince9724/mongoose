import React from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-bebas text-6xl text-white tracking-wide mb-2">
          BOOKING & <span className="text-neonCyan">INQUIRIES</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Reach out directly to book photography sessions, request beat licensing, or discuss soundtrack commissions.
        </p>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;
