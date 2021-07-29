import React from 'react'
import { useParams } from "react-router-dom";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

function ChatFeild() {
	const { id } = useParams();

	return (
		<div className="chat">
			<div className="chatHeader">
				<h4>💬{id}</h4>
			</div>
			<div className="MessageSection"></div>
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
