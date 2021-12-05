import fs from 'fs';

function isVideo(req, res, next) {
	// Reference to Video File (Allegedly)
	let videoRef = req.file;

	if(videoRef.mimetype === 'video/mp4' || videoRef.mimetype === 'video/mpeg') {
		next()
	} else {
		fs.unlinkSync(`uploads/${req.uid}/${videoRef.filename}`)
		res.status(400).send("Please Upload a video");
	}
}

export default isVideo