import multer from 'multer';
import express from 'express';

const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, 'sssss.png')
  }
})
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('video'), (req, res) => {
	if(req.files.video.mimetype === 'image/gif') {
		console.log('gif file')
	} else {
		console.log('not video')
		console.log(req.files.video.mimetype)
	}
})

export default router;