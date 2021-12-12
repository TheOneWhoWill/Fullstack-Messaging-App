import fs from 'fs';
import express from 'express';
import Videos from '../models/videos.js';
import { verifyIDToken, verifyIDTokenWithParams } from '../middleware/auth.js';

const router = express.Router()

router.post('/preview/:videoId', verifyIDToken, async (req, res) => {
	console.log('ss')
	// Find the video Id in the database
  try {
		let videoId = req.params.videoId
		let video = await Videos.findOne({_id: videoId});

		if(video.uid === req.uid) {
			res.send(video)
		} else {
			throw new Error("")
		}
	} catch (error) {
		res.status(400).send("Cannot access video")
	}
})

router.get('/:videoId', async (req, res) => {
	// Find the video Id in the database
  try {
		let videoId = req.params.videoId
		let video = await Videos.findOne({_id: videoId});

		if(video.publishStatus === "Published") {
			res.send(video);
		} else {
			throw new Error("")
		}
	} catch (error) {
		res.status(400).send("Cannot access video")
	}
})

router.get('/stream/:uploadId', async (req, res) => {
	try {
		const mongoVideoIndex = req.params.uploadId;
		// Looks for upload index based on upload id
		let upload = await Videos.findOne({_id: mongoVideoIndex});
		let path = upload.video;
		let range = req.headers.range;
		let size = fs.statSync(path).size;

		// How much will be sent per request,
		// increase or decrease as needed for performance
		let CHUNK_SIZE = 10 ** 6; // 1MB
		let start = Number(range.replace(/\D/g, ""));
		let end = Math.min(start + CHUNK_SIZE, size - 1);
	
		// Create headers
		let contentLength = end - start + 1;
		let headers = {
			"Content-Range": `bytes ${start}-${end}/${size}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
		};
		if(video.publishStatus === "Published") {
			// 206 is the Code for partial content
			res.writeHead(206, headers);
			// Creates a reas stream for a certain chunk and sends it to client
			let videoStream = fs.createReadStream(path, { start, end });
			videoStream.pipe(res);
		} else {
			throw new Error("")
		}
	} catch (err) {
		res.status(400).send("Couldnt find video")
	}
})

router.get('/preview/stream/:uploadId?:token', verifyIDTokenWithParams, async (req, res) => {
	try {
		const mongoVideoIndex = req.params.uploadId;
		// Looks for upload index based on upload id
		let upload = await Videos.findOne({_id: mongoVideoIndex});
		let path = upload.video;
		let range = req.headers.range;
		let size = fs.statSync(path).size;

		// How much will be sent per request,
		// increase or decrease as needed for performance
		let CHUNK_SIZE = 10 ** 6; // 1MB
		let start = Number(range.replace(/\D/g, ""));
		let end = Math.min(start + CHUNK_SIZE, size - 1);
	
		// Create headers
		let contentLength = end - start + 1;
		let headers = {
			"Content-Range": `bytes ${start}-${end}/${size}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
		};
		if(req.uid === upload.uid) {
			// 206 is the Code for partial content
			res.writeHead(206, headers);
			// Creates a reas stream for a certain chunk and sends it to client
			let videoStream = fs.createReadStream(path, { start, end });
			videoStream.pipe(res);
		} else {
			throw new Error("")
		}
	} catch (err) {
		res.status(400).send("Couldnt find video")
	}
})

export default router;