import React, { useState, useEffect } from 'react';
import { getPhotos } from '../services/api';
import Lightbox from './Lightbox';
import { Eye, Filter } from 'lucide-react';

const Gallery = ({ limit }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const data = await getPhotos();
      setPhotos(data);
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  const categories = ['All', 'Portrait', 'Wedding', 'Street', 'Nature'];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const displayedPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos;

  return (
    <section className="py-20 bg-darkBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide mb-4">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">PHOTOGRAPHY</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore cinematic moments, editorial portraits, and high-fashion visual stories captured across the globe.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <div className="inline-flex items-center space-x-1 glass-panel p-1.5 rounded-full border border-cardBorder">
            <Filter size={16} className="text-neonCyan ml-3 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-neonPink to-pink-600 text-white shadow-lg shadow-neonPink/25 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-neonPink border-t-transparent animate-spin" />
          </div>
        ) : (
          /* Photography Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedPhotos.map((photo) => (
              <div
                key={photo._id}
                onClick={() => setActivePhoto(photo)}
                className="group relative h-96 rounded-2xl overflow-hidden glass-panel border border-cardBorder cursor-pointer shadow-xl transform transition-all duration-500 hover:-translate-y-2 hover:border-neonPink/60 hover:shadow-2xl hover:shadow-neonPink/20"
              >
                {/* Photo Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg/90 via-darkBg/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-darkBg/80 text-neonCyan border border-neonCyan/30 backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Hover Action Preview Icon */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-neonPink/90 text-white flex items-center justify-center shadow-lg shadow-neonPink/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={24} />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bebas text-2xl text-white tracking-wide mb-1 group-hover:text-neonPink transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {photo.camera} • {photo.exif}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
      )}
    </section>
  );
};

export default Gallery;
