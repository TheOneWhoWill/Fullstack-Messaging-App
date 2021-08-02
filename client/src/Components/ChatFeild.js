import axios from 'axios';
import Message from './Message';
import firebase from 'firebase'
import { useParams } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

async function getMessgaes(query, setMessages) {
	let idToken = await firebase.auth().currentUser.getIdToken(true);
	
	let request = {token: idToken}
	axios.get(query, request)
		.then(res => {
			if(typeof res.data !== String) {
				setMessages(res.data)
				console.log(res.data)
			} else {
				console.log(res.data)
			}
		})
}

function ChatFeild() {
	const { id } = useParams();
	const inputRef = useRef(null);
	const { currentUser } = useAuth();
	let [userData, setUserData] = useState();
	let [messages, setMessages] = useState();
	
	useEffect(() => {
		let query = `${process.env.REACT_APP_BASE_URL}/auth/get/user/${id}`;
		let getMsgQuery = `${process.env.REACT_APP_BASE_URL}/retrieve/messages/${id}`;
		// User Data being fetched
		axios.get(query)
			.then(res => {
				if(typeof res.data !== String) {
					setUserData(res.data);
				}
			})
		// Messages being fetched
		getMessgaes(getMsgQuery, setMessages)
		console.log(messages)
	}, [])

	function sendMessage() {
		firebase.auth().currentUser.getIdToken(true)
			.then(idToken => {
				let query = `${process.env.REACT_APP_BASE_URL}/send/message`;
				let request = {
					token: idToken,
					msg: inputRef.current.value,
					sender: currentUser.uid,
					recipient: id
				}
				axios.post(query, request)
					.then(response => {
						// Idk do something
					})
			})
			.catch(err => {console.log(err)})
	}

	function keyDownHandler(e) {
		if(e.key === 'Enter') {
			sendMessage()
		}
	}

	return (
		<div className="chat">
			<div className="chatHeader">
				<h4>💬 #{userData && userData.displayName}</h4>
			</div>
			<div className="MessageSection">
				<Message
					sender="Pixel System Message"
					timestamp="Now"
					msg={`The User you are trying to reach does not exist or could not be found`}						img="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c"
				/>
			</div>
			<div className="chatBottom">
				<div className="inputFeild">
					<input type="text" placeholder="Write a message. Be Nice." onKeyPress={(e) => keyDownHandler(e)} ref={inputRef}/>
					<button><Icon icon={faPlus}/></button>
					<button>😃</button>
				</div>
			</div>
		</div>
	)
}

export default ChatFeild