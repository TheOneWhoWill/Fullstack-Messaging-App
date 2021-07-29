import React from 'react'
import Message from './Message'
import { useParams } from "react-router-dom";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

function ChatFeild() {
	const { id } = useParams();

	return (
		<div className="chat">
			<div className="chatHeader">
				<h4>💬 #{id}</h4>
			</div>
			<div className="MessageSection">
				<Message
					sender="m1000"
					timestamp="6:45 PM"
					msg={`Hello, this is a message sent from #${id}`}
					img="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c"
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