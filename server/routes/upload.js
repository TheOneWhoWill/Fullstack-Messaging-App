import fs from 'fs';
import multer from 'multer';
import express from 'express';
import multerS3 from 'multer-s3'
import { awsFileUpload, s3 } from '../aws/s3.js'
import { verifyIDToken } from '../middleware/auth.js'

const router = express.Router()
const storage = multer.diskStorage({
	storage: multerS3({
		s3: s3,
		bucket: 'pixels-video-bucket',
		metadata: (req, file, cb) => {
			cb(null, {fieldName: file.fieldname});
		},
		key: (req, file, cb) => {
			cb(null, `${req.uid}/${file.fieldname}`);
		}
	})
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