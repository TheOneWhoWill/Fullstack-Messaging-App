import express from 'express';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Get Messages
router.post('/messages/:id', verifyIDToken, (req, res) => {
	let currentUser = req.uid;
	let secondParty = req.params.id;
	
	Message.find({members: { $size: 2, $all: [currentUser, secondParty] }})
		.then(messages => {
			res.send(messages)
		})
		.catch(() => {
			res.send("Cound not retrieve messages")
		})
})


export default router