import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';
import Videos from '../models/videos.js';
import isVideo from '../middleware/isvideo.js'
import canUpload from '../middleware/canUpload.js'
import { verifyIDToken, verifyIDTokenWithParams } from '../middleware/auth.js';

const router = express.Router()
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let path = `./uploads/${req.uid}`;
		if (!fs.existsSync(path)){
			fs.mkdirSync(path);
		}
		cb(null, path)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage });

router.post('/', verifyIDTokenWithParams, upload.single('video'), isVideo, async (req, res) => {
	try {
		// Reference to Video File
		let videoRef = req.file;
		// Save in MongoDB
		Videos.create({
			uid: req.uid,
			publishStatus: "Unpublished",
			uploadDate: new Date().getTime(),
			video: `uploads/${req.uid}/${videoRef.filename}`,
			title: req.body.title ? req.body.title : videoRef.filename
		})
		// Response to client
		res.status(200).send("File Upload Successful");
	} catch (e) {
		// Reference to Video File
		let videoRef = req.file;
		// Delete files from local server after download
		//fs.unlinkSync(`./uploads/${req.uid}/${videoRef.filename}`)
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