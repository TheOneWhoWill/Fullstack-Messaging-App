import express from 'express';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Add Contact
router.post('/add', verifyIDToken, (req, res) => {
	// Template for Contact System
})

export default router