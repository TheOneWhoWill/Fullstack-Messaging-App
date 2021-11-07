import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';
import Videos from '../models/videos.js'
import isVideo from '../middleware/isvideo.js'
import { verifyIDToken } from '../middleware/auth.js'

const router = express.Router()
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: (req, file, cb) => {
		cb(null, file.originalname)
		path.extname(file.originalname)
	}
})
const upload = multer({ storage: storage });

router.post('/', upload.single('video'), verifyIDToken, isVideo, async (req, res) => {
	try {
		// Reference to Video File
		let videoRef = req.file;
		// Upload to AWS
		// Save in MongoDB
		Videos.create({
			uid: req.uid,
			video: awsResponse.Location,
			publishStatus: 'Unpublished',
			Key: awsResponse.Key,
			title: awsResponse.ETag.slice(1, -1),
		})
		// Delete files from local server after download
		fs.unlinkSync(`uploads/${videoRef.filename}`)
		// Response to client
		res.status(200).send("File Upload Successful");
	} catch (e) {
		// Reference to Video File
		let videoRef = req.file;
		// Delete files from local server after download
		fs.unlinkSync(`uploads/${videoRef.filename}`)
		// Send Status Code
		res.status(400).send("File Upload Unsuccessful");
	}
})

router.post('/get', verifyIDToken, (req, res) => {
	Videos.find({uid: req.uid})
		.then(videos => {
			res.send(videos)
		})
		.catch(() => {
			res.status(400).send('Error finding Video Files')
		})
})

export default router;