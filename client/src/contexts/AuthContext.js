import {
	signInWithPopup,
	GoogleAuthProvider,
	TwitterAuthProvider,
	signInWithCustomToken,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword
} from "firebase/auth";
import '../firebase'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext()
const auth = getAuth();

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [loading, setLoading] = useState(true)
	const [currentUser, setCurrentuser] = useState(null)

	function signup(email, password, displayName, profile) {
		return createUserWithEmailAndPassword(email, password).then(function(result) {
			result.user.updateProfile({
				displayName: displayName,
				photoURL: profile
			})
		})
	}

	function GoogleSignIn() {
		let provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider)
	}

	function TwitterSignIn() {
		var provider = new TwitterAuthProvider();
		return signInWithPopup(provider)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(email)
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function loginWithToken(token) {
		return signInWithCustomToken(token)
	}

	function logout() {
		signOut(auth)
			.then(() => {
				console.log('Signed Out')
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setCurrentuser(user)
			setLoading(false)
			if(user) {
				return <Navigate to="/Home" />
			} else {
				<Navigate to="/Login" />
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const value = {
		loginWithToken,
		resetPassword,
		TwitterSignIn,
		GoogleSignIn,
		currentUser,
		me: 'ssssss',
		updateEmail,
		signup,
		login,
		logout
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}