import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, default: 'Prince Beats' },
    genre: { type: String, default: 'Synthwave' },
    duration: { type: String, default: '03:30' },
    audioUrl: { type: String, required: true },
    coverArtUrl: { type: String },
    spotifyUrl: { type: String },
    youtubeUrl: { type: String },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Music', musicSchema);
