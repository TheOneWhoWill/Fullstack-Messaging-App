import express from 'express';
import Videos from '../models/videos.js';
//import { verifyIDToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/:uploadId', async (req, res) => {
	try {
		const mongoVideoIndex = req.params.uploadId;
		// Looks for upload index based on upload id
		let upload = await Videos.findOne({_id: mongoVideoIndex})
		console.log(upload.Key)
		// Finds File using Key
		// Sends Read Stream as Response
	} catch (err) {
		res.status(400).send("Couldnt find video")
	}
})

export default router;