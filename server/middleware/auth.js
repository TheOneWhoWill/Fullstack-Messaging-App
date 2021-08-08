import admin from 'firebase-admin';

function verifyIDToken(req, res, next) {
	let idToken = req.body.token

	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			req.uid = decodedToken.uid
			next()
		})
		.catch(error => {
			res.send(error)
		})
}

function verifyIDTokenWithParams(req, res, next) {
	let idToken = req.params.token

	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			req.uid = decodedToken.uid
			next()
		})
		.catch(error => {
			res.send(error)
		})
}

export { verifyIDToken, verifyIDTokenWithParams };