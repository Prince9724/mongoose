import express from 'express';
import { PhotoController } from '../controllers/photoController.js';

const router = express.Router();

router.get('/', PhotoController.getPhotos);
router.post('/', PhotoController.createPhoto);
router.delete('/:id', PhotoController.deletePhoto);

export default router;
