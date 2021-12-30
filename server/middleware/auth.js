import fs from 'fs';
import admin from 'firebase-admin';

function clearFiles(file) {
	if(file) {
		fs.unlinkSync(`./uploads/${file.filename}`)
	}
}

function verifyIDToken(req, res, next) {
	let idToken = req.body.token;

	idToken && admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			req.uid = decodedToken.uid
			next()
		})
		.catch(error => {
			res.send(error)
			clearFiles(req.file)
		})
}

function verifyIDTokenWithParams(req, res, next) {
	let idToken = req.params.token || req.query.token

	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			req.uid = decodedToken.uid
			next()
		})
		.catch(error => {
			res.send(error)
		})
}

function verifyHeaderIDToken(req, res, next) {
	next()
}

function verifySocket(idToken) {
	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			return decodedToken.uid
		})
		.catch(error => {
			res.send(error)
		})
}


export { verifyIDToken, verifyIDTokenWithParams, verifySocket, verifyHeaderIDToken };