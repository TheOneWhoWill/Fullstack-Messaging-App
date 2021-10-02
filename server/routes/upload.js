import fs from 'fs';
import multer from 'multer';
import express from 'express';
import admin from 'firebase-admin';
import path from 'path';

const router = express.Router()
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: (req, file, cb) => {
		cb(null, file.originalname)
		path.extname(file.originalname.originalname)
	}
})
const upload = multer({ storage: storage });

router.post('/', upload.single('video'), (req, res) => {
	let bucket = admin.storage().bucket('webflix-c9265');
	let videoRef = req.files.video;

	if(videoRef.mimetype === 'image/gif') {
		console.log('gif file')
		fs.writeFile(`uploads/${videoRef.name}`, videoRef.data, (err) => console.log(err))
	} else {
		console.log('not video')
		console.log(videoRef.mimetype)
	}
})

export default router;