import express from 'express';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Send Message
router.post('/message', verifyIDToken, (req, res) => {
	const message = {
    sender: req.body.sender,
		recipient: {
			type: 'user',
			uid: req.body.recipient
		},
		body: req.body.msg,
		members: [req.body.sender, req.body.recipient]
  }
	Message.create(message);
})

export default router