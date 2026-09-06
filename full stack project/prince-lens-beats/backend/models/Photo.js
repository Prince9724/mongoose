import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['Portrait', 'Wedding', 'Street', 'Nature'], required: true },
    imageUrl: { type: String, required: true },
    camera: { type: String, default: 'Sony A7IV' },
    lens: { type: String, default: '85mm f/1.4 GM' },
    exif: { type: String, default: 'f/1.4 • 1/500s • ISO 400' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Photo', photoSchema);
