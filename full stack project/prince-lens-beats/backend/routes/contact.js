import express from 'express';
import { ContactController } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', ContactController.submitContact);
router.get('/', ContactController.getContacts);

export default router;
