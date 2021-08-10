import express from 'express';
import { io } from 'socket.io-client';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()
const socket = io.connect('http://localhost:2000')

// Send Message
router.post('/message', verifyIDToken, (req, res) => {
	const message = {
    sender: {
			uid: req.body.sender,
			name: req.body.senderName,
			photo: req.body.senderImg
		},
		recipient: {
			type: 'user',
			uid: req.body.recipient
		},
		timestamp: Math.round((new Date()).getTime()),
		body: req.body.msg,
		members: [req.body.sender, req.body.recipient]
  }
	Message.create(message);
	socket.emit('message', message);
})

export default router