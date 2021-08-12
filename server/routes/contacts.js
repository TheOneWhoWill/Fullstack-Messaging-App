import express from 'express';
import admin from 'firebase-admin';
import Message from '../models/message.js';
import { verifyIDToken } from '../middleware/auth.js';

const router = express.Router()

// Get Contacts
router.post('/get', verifyIDToken, (req, res) => {
	function pluck(array, key, key2, key3) {
		return array.map(function(item) { return {uid: item[key], displayName: item[key2], photoURL: item[key3]}; });
	}

	admin.auth().listUsers(10)
		.then(result => {
			res.send(pluck(result.users, 'uid', 'displayName', 'photoURL'))
		})
		.catch((error) => {
			res.send('Unable to fetch users: ' + error)
		})
})

// Add Contact
router.post('/add', verifyIDToken, (req, res) => {
	function pluck(array, key, key2, key3) {
		return array.map(function(item) { return {uid: item[key], displayName: item[key2], photoURL: item[key3]}; });
	}

	admin.auth().listUsers(10)
		.then(result => {
			res.send(pluck(result.users, 'uid', 'displayName', 'photoURL'))
		})
		.catch((error) => {
			res.send('Unable to fetch users: ' + error)
		})
})

export default router