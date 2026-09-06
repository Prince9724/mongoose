import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Camera, Music, Mail, Plus, Trash2, CheckCircle2, LogOut } from 'lucide-react';
import { DUMMY_PHOTOS, DUMMY_TRACKS } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [photosList, setPhotosList] = useState(DUMMY_PHOTOS);
  const [tracksList, setTracksList] = useState(DUMMY_TRACKS);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  // Form states
  const [newPhoto, setNewPhoto] = useState({ title: '', category: 'Portrait', imageUrl: '', camera: 'Sony A7IV', exif: 'f/1.4 • ISO 200' });
  const [newTrack, setNewTrack] = useState({ title: '', artist: 'Prince Beats', genre: 'Synthwave', audioUrl: '', coverArtUrl: '', duration: '03:15' });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.imageUrl) return;
    const created = { ...newPhoto, _id: Date.now().toString() };
    setPhotosList([created, ...photosList]);
    setNewPhoto({ title: '', category: 'Portrait', imageUrl: '', camera: 'Sony A7IV', exif: 'f/1.4 • ISO 200' });
    triggerNotify('New Photo successfully published to Portfolio!');
  };

  const handleDeletePhoto = (id) => {
    setPhotosList(photosList.filter(p => p._id !== id));
    triggerNotify('Photo removed from collection.');
  };

  const handleAddTrack = (e) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.audioUrl) return;
    const created = { ...newTrack, _id: Date.now().toString() };
    setTracksList([created, ...tracksList]);
    setNewTrack({ title: '', artist: 'Prince Beats', genre: 'Synthwave', audioUrl: '', coverArtUrl: '', duration: '03:15' });
    triggerNotify('New Music Track published to Audio Player!');
  };

  const handleDeleteTrack = (id) => {
    setTracksList(tracksList.filter(t => t._id !== id));
    triggerNotify('Audio track removed.');
  };

  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 glass-panel p-6 rounded-3xl border border-cardBorder">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-neonCyan/10 text-neonCyan border border-neonCyan/30">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="font-bebas text-4xl text-white tracking-wide">ADMIN CONTROL DASHBOARD</h1>
              <p className="text-xs text-slate-400">Logged in as studio administrator.</p>
            </div>
          </div>

          {/* Navigation Tabs & Logout */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-darkBg/80 p-1.5 rounded-2xl border border-cardBorder">
              {[
                { id: 'photos', label: 'Photos', icon: Camera },
                { id: 'music', label: 'Music', icon: Music },
                { id: 'messages', label: 'Messages', icon: Mail },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neonPink to-pink-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all shadow-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-3 text-sm animate-fadeIn">
            <CheckCircle2 size={20} />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab 1: Manage Photos */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add Photo Form */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-cardBorder h-fit">
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-4 flex items-center space-x-2">
                <Plus size={20} className="text-neonPink" />
                <span>UPLOAD NEW PHOTO</span>
              </h3>
              <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Photo Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neon Horizon"
                    value={newPhoto.title}
                    onChange={e => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonPink"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Category</label>
                  <select
                    value={newPhoto.category}
                    onChange={e => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan"
                  >
                    <option value="Portrait">Portrait</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Street">Street</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Image URL (Direct link)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newPhoto.imageUrl}
                    onChange={e => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonPink"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold shadow-lg hover:shadow-neonPink/30 transition-all text-sm"
                >
                  Publish Photo
                </button>
              </form>
            </div>

            {/* Photo List */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-cardBorder">
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">EXISTING PHOTOS ({photosList.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {photosList.map(photo => (
                  <div key={photo._id} className="p-3 rounded-2xl bg-darkBg/60 border border-cardBorder flex items-center justify-between space-x-4">
                    <img src={photo.imageUrl} alt={photo.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bebas text-lg text-white truncate">{photo.title}</h4>
                      <span className="text-[10px] text-neonCyan font-bold uppercase tracking-wider">{photo.category}</span>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(photo._id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Music */}
        {activeTab === 'music' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add Track Form */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-cardBorder h-fit">
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-4 flex items-center space-x-2">
                <Plus size={20} className="text-neonCyan" />
                <span>UPLOAD NEW TRACK</span>
              </h3>
              <form onSubmit={handleAddTrack} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Track Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Pulse"
                    value={newTrack.title}
                    onChange={e => setNewTrack({ ...newTrack, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Genre</label>
                  <input
                    type="text"
                    placeholder="Synthwave / Lo-Fi / Film Score"
                    value={newTrack.genre}
                    onChange={e => setNewTrack({ ...newTrack, genre: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Audio File Stream URL (.mp3)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={newTrack.audioUrl}
                    onChange={e => setNewTrack({ ...newTrack, audioUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium uppercase">Cover Art Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newTrack.coverArtUrl}
                    onChange={e => setNewTrack({ ...newTrack, coverArtUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neonCyan to-cyan-600 text-darkBg font-bold shadow-lg hover:shadow-neonCyan/30 transition-all text-sm"
                >
                  Publish Track
                </button>
              </form>
            </div>

            {/* Music Track List */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-cardBorder">
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">ACTIVE DISCOGRAPHY ({tracksList.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {tracksList.map(track => (
                  <div key={track._id} className="p-3 rounded-2xl bg-darkBg/60 border border-cardBorder flex items-center justify-between space-x-4">
                    <img src={track.coverArtUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17'} alt={track.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bebas text-lg text-white truncate">{track.title}</h4>
                      <p className="text-xs text-slate-400">{track.artist} • {track.genre}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTrack(track._id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Track"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Messages */}
        {activeTab === 'messages' && (
          <div className="glass-panel p-6 rounded-3xl border border-cardBorder">
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">CLIENT INQUIRIES & BOOKINGS</h3>
            <div className="space-y-4">
              {[
                { name: 'Sarah Jenkins', email: 'sarah@vogue-editorial.com', subject: 'Photography Booking', message: 'Hi Prince, we would like to book you for an autumn editorial cover shoot in LA on October 12th.', date: '2026-08-03' },
                { name: 'Marcus Vance', email: 'marcus@synthrecords.io', subject: 'Music Production', message: 'Looking for 3 custom synthwave beats for our upcoming cyberpunk indie video game.', date: '2026-08-01' }
              ].map((msg, i) => (
                <div key={i} className="p-5 rounded-2xl bg-darkBg border border-cardBorder space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bebas text-xl text-white">{msg.name}</span>
                    <span className="text-xs text-slate-500">{msg.date}</span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neonPink/10 text-neonPink border border-neonPink/30">
                    {msg.subject}
                  </span>
                  <p className="text-sm text-slate-300 font-light">{msg.message}</p>
                  <p className="text-xs text-neonCyan font-mono">Reply to: {msg.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
