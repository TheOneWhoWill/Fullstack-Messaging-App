import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';
import { awsFileUpload } from '../aws/s3.js'
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

router.post('/', upload.single('video'), verifyIDToken, async (req, res) => {
	// Reference to Video File
	let videoRef = req.file;
	// Upload to AWS
	let awsResponse = await awsFileUpload(videoRef, req.uid)
	// Delete files from local server after download
	fs.unlinkSync(`uploads/${videoRef.filename}`)
	// Response to client
	res.send('File Upload Successful')
})

export default router;