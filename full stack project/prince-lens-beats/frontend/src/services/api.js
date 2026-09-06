import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fallback dummy data for photography gallery
export const DUMMY_PHOTOS = [
  {
    _id: '1',
    title: 'Neon Cyber Portrait',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    camera: 'Sony A7IV',
    lens: '85mm f/1.4 GM',
    exif: 'f/1.4 • 1/500s • ISO 400',
    featured: true
  },
  {
    _id: '2',
    title: 'Midnight Sunset Ceremony',
    category: 'Wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    camera: 'Canon EOS R5',
    lens: '35mm f/1.4 L',
    exif: 'f/2.0 • 1/200s • ISO 100',
    featured: true
  },
  {
    _id: '3',
    title: 'Tokyo Rain Reflections',
    category: 'Street',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80',
    camera: 'Fujifilm X-T4',
    lens: '23mm f/2.0',
    exif: 'f/2.8 • 1/125s • ISO 800',
    featured: true
  },
  {
    _id: '4',
    title: 'Mist Mountain Horizon',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    camera: 'Sony A7R V',
    lens: '16-35mm f/2.8 GM',
    exif: 'f/8.0 • 1/60s • ISO 100',
    featured: true
  },
  {
    _id: '5',
    title: 'Studio Lighting Silhouette',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    camera: 'Sony A7IV',
    lens: '50mm f/1.2 GM',
    exif: 'f/1.8 • 1/800s • ISO 200',
    featured: false
  },
  {
    _id: '6',
    title: 'Gothic Cathedral Vows',
    category: 'Wedding',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    camera: 'Canon EOS R5',
    lens: '50mm f/1.2 L',
    exif: 'f/1.4 • 1/400s • ISO 320',
    featured: false
  }
];

// Fallback dummy data for music tracks
export const DUMMY_TRACKS = [
  {
    _id: '1',
    title: 'Electric Midnight Vibe',
    artist: 'Prince Beats ft. Aura',
    genre: 'Synthwave / Cyber',
    duration: '03:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
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
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
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
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    featured: true
  }
];

export const getPhotos = async () => {
  try {
    const response = await api.get('/photos');
    return response.data.length > 0 ? response.data : DUMMY_PHOTOS;
  } catch (error) {
    console.warn('Backend offline, using dummy photo data:', error.message);
    return DUMMY_PHOTOS;
  }
};

export const getMusicTracks = async () => {
  try {
    const response = await api.get('/music');
    return response.data.length > 0 ? response.data : DUMMY_TRACKS;
  } catch (error) {
    console.warn('Backend offline, using dummy music data:', error.message);
    return DUMMY_TRACKS;
  }
};

export const sendContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.warn('Backend offline, simulating contact submit:', error.message);
    return { success: true, message: 'Thank you! Your message has been received (Demo mode).' };
  }
};

export default api;
