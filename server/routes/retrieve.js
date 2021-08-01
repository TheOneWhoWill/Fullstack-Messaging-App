import express from 'express';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Get Messages
router.get('/messages/:id', verifyIDToken, (req, res) => {
	let currentUser = req.uid;
	let secondParty = req.params.id;
	
	Message.find()
		.then(messages => {
			res.send(messages)
		})
})


export default router