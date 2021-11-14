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
import { useNavigate  } from "react-router-dom";

const AuthContext = React.createContext()
const auth = getAuth();

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true)
	const [currentUser, setCurrentuser] = useState()

	function signup(email, password, displayName, profile) {
		return createUserWithEmailAndPassword(email, password).then(function(result) {
			result.user.updateProfile({
				displayName: displayName,
				photoURL: profile
			})
		})
	}

	function GoogleSignIn() {
		var provider = new GoogleAuthProvider();
		return signInWithPopup(provider)
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
		return signInWithEmailAndPassword(email, password)
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
		onAuthStateChanged(auth, (user) => {
			setCurrentuser(user)
			setLoading(false)
			if(user) {
				navigate('/Home')
			} else {
				navigate('/Login')
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