import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const history = useHistory();
	const [currentUser, setCurrentuser] = useState()

	function signup(email, password, displayName, profile) {
		return auth.createUserWithEmailAndPassword(email, password).then(function(result) {
			result.user.updateProfile({
				displayName: displayName,
				photoURL: profile
			})
		})
	}

	function GoogleSignIn() {
		var provider = new firebase.auth.GoogleAuthProvider();
		return auth.signInWithPopup(provider)
	}

	function TwitterSignIn() {
		var provider = new firebase.auth.TwitterAuthProvider();
		return auth.signInWithPopup(provider)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function logout() {
		return auth.signOut()
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentuser(user)
			if(user) {
				history.push('/Home')
			} else {
				history.push('/Login')
			}
		})

		return unsubscribe
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const value = {
		resetPassword,
		TwitterSignIn,
		GoogleSignIn,
		currentUser,
		updateEmail,
		signup,
		login,
		logout
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}