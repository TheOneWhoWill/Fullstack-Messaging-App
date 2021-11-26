import admin from 'firebase-admin';

function canUpload(req) {
	let idToken = req.body.token;

	idToken && admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			req.uid = decodedToken.uid
			return true
		})
		.catch(error => {
			return false
		})
}

export default canUpload