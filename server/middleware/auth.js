import admin from 'firebase-admin';

function verifyIDToken(req, res, next) {
	let idToken = req.query.token
	
	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
		})
		.catch(error => {
			console.log(error)
		})
	next()
}

export { verifyIDToken }