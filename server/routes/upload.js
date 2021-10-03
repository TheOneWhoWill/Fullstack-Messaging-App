import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';
import { awsFileUpload } from '../aws/s3.js'

const router = express.Router()
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: (req, file, cb) => {
		cb(null, file.originalname)
		path.extname(file.originalname)
	}
})
const upload = multer({ storage: storage });

router.post('/', upload.single('video'), async (req, res) => {
	let videoRef = req.file;
	let awsResult = await awsFileUpload(videoRef)
})

export default router;