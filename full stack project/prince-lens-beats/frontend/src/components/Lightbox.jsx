import React from 'react';
import { X, Camera, Sliders, Calendar } from 'lucide-react';

const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-cardBg/80 border border-cardBorder text-slate-300 hover:text-white hover:border-neonPink transition-colors shadow-2xl"
      >
        <X size={24} />
      </button>

      <div className="max-w-5xl w-full max-h-[90vh] glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row border border-cardBorder shadow-2xl">
        {/* Main Image */}
        <div className="flex-1 bg-black/60 flex items-center justify-center p-4 relative overflow-hidden group">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Metadata Sidebar */}
        <div className="w-full md:w-80 p-6 md:p-8 bg-cardBg flex flex-col justify-between border-t md:border-t-0 md:border-l border-cardBorder">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neonPink/10 text-neonPink border border-neonPink/30 mb-3">
              {photo.category}
            </span>
            <h3 className="font-bebas text-3xl text-white mb-4 tracking-wide">{photo.title}</h3>
            
            {/* EXIF Information */}
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-darkBg/60 border border-cardBorder">
                <Camera size={18} className="text-neonCyan flex-shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium uppercase">Camera</span>
                  <span className="font-medium text-slate-200">{photo.camera || 'Sony A7IV'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-darkBg/60 border border-cardBorder">
                <Sliders size={18} className="text-neonPink flex-shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium uppercase">Lens & EXIF</span>
                  <span className="font-medium text-slate-200">{photo.lens || '85mm f/1.4'}</span>
                  <span className="block text-xs text-slate-400 mt-0.5">{photo.exif || 'f/1.4 • 1/500s • ISO 400'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-darkBg/60 border border-cardBorder">
                <Calendar size={18} className="text-purple-400 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium uppercase">Creation Year</span>
                  <span className="font-medium text-slate-200">2026 Collection</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-cardBorder/60 mt-6">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold text-sm shadow-lg hover:shadow-neonPink/30 transition-all"
            >
              Close Lightbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
