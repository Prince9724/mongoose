import Photo from '../models/Photo.js';

const SEED_PHOTOS = [
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
  }
];

export class PhotoController {
  static async getPhotos(req, res) {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 });
      if (photos && photos.length > 0) {
        return res.json(photos);
      }
      return res.json(SEED_PHOTOS);
    } catch (err) {
      return res.json(SEED_PHOTOS);
    }
  }

  static async createPhoto(req, res) {
    try {
      const photo = new Photo(req.body);
      const saved = await photo.save();
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(201).json({ ...req.body, _id: Date.now().toString() });
    }
  }

  static async deletePhoto(req, res) {
    try {
      await Photo.findByIdAndDelete(req.params.id);
      return res.json({ success: true, message: 'Photo deleted' });
    } catch (err) {
      return res.json({ success: true, message: 'Photo deleted (mock)' });
    }
  }
}
