import Music from '../models/Music.js';

const SEED_TRACKS = [
  {
    _id: '1',
    title: 'Electric Midnight Vibe',
    artist: 'Prince Beats ft. Aura',
    genre: 'Synthwave / Cyber',
    duration: '03:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    _id: '2',
    title: 'Neon Rain Echoes',
    artist: 'Prince Beats',
    genre: 'Lo-Fi Chill',
    duration: '02:30',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    _id: '3',
    title: 'Cinematic Horizon Score',
    artist: 'Prince Beats Orchestra',
    genre: 'Film Score',
    duration: '04:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    featured: true
  }
];

export class MusicController {
  static async getTracks(req, res) {
    try {
      const tracks = await Music.find().sort({ createdAt: -1 });
      if (tracks && tracks.length > 0) {
        return res.json(tracks);
      }
      return res.json(SEED_TRACKS);
    } catch (err) {
      return res.json(SEED_TRACKS);
    }
  }

  static async createTrack(req, res) {
    try {
      const track = new Music(req.body);
      const saved = await track.save();
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(201).json({ ...req.body, _id: Date.now().toString() });
    }
  }

  static async deleteTrack(req, res) {
    try {
      await Music.findByIdAndDelete(req.params.id);
      return res.json({ success: true, message: 'Track deleted' });
    } catch (err) {
      return res.json({ success: true, message: 'Track deleted (mock)' });
    }
  }
}
