import express from 'express';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Get Messages
router.post('/messages/:id', verifyIDToken, (req, res) => {
	let currentUser = req.uid;
	let secondParty = req.params.id;

	if(currentUser !== secondParty) {
		Message.find({ $and: [{members: { $all: [currentUser, secondParty] }}, {members: { $size: 2}}] })
			.then(messages => {
				res.send(messages)
			})
			.catch(() => {
				res.send("Cound not retrieve messages")
			})
	} else {
		res.send([])
	}
})


export default router