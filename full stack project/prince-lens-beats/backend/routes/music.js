import express from 'express';
import { MusicController } from '../controllers/musicController.js';

const router = express.Router();

router.get('/', MusicController.getTracks);
router.post('/', MusicController.createTrack);
router.delete('/:id', MusicController.deleteTrack);

export default router;
