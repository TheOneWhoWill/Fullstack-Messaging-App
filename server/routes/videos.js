import express from 'express';
import Videos from '../models/videos.js';
import { getFileStream } from '../aws/s3.js'
//import { verifyIDToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/:uploadId', async (req, res) => {
	try {
		const mongoVideoIndex = req.params.uploadId;
		// Looks for upload index based on upload id
		let upload = await Videos.findOne({_id: mongoVideoIndex})
		console.log(upload.Key)
		// Finds File using Key
		const readStream = getFileStream(upload.Key)
		// Sends Read Stream as Response
		readStream.pipe(res)
	} catch (err) {
		res.status(400).send("Couldnt find video")
	}
})

export default router;