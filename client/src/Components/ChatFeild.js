import Message from './Message'
import axios from 'axios'
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

function ChatFeild() {
	const { id } = useParams();
	let [userData, setUserData] = useState();
	
	useEffect(() => {
		let query = `${process.env.REACT_APP_BASE_URL}/auth/get/user/${id}`;
		axios.get(query)
			.then(res => {
				if(typeof res.data !== String) {
					setUserData(res.data);
				}
			})
	})

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
					<input type="text" placeholder="Write a message. Be Nice." />
					<button><Icon icon={faPlus}/></button>
					<button>😃</button>
				</div>
			</div>
		</div>
	)
}

export default ChatFeild