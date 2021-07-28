import express from 'express';
import admin from 'firebase-admin';
import { verifyIDToken } from '../middleware/auth.js'

const auth = admin.auth();
const router = express.Router()

async function createToken(uid) {
	return await auth.createCustomToken(uid)
}

// Create Custom Token
router.get('/create/token', verifyIDToken, (req, res) => {
	let uid = req.uid

	createToken(uid)
		.then(token => {
			res.send(token)
		})
		.catch(error => {
			res.send('Custom Token Creation Failed: ' + error)
		})
})

// Create Account
router.post('/create/account', (req, res) => {
	auth.createUser({
		email: req.body.email,
		emailVerified: false,
		password: req.body.password,
		photoURL: req.body.photoURL,
		displayName: req.body.displayName
	})
	.then(userRecord => {
		let uid = userRecord.uid

		createToken(uid)
			.then(token => {
				res.send(token)
			})
			.catch(error => {
				res.send(error)
			})
	})
	.catch((error) => {
		res.send('Account Creation Failed: ' + error)
	})
})

export default router