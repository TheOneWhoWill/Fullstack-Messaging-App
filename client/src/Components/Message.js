import React from 'react'

function Message(props) {
	return (
		<div className="message">
			<img src={props.img} alt="." />
			<div className="msgBody">
				<div className="top">
					<span className="sender">{props.sender}</span>
					<span className="timestamp">{props.timestamp}</span>
				</div>
				<p className="msgText">{props.msg}</p>
			</div>
		</div>
	)
}

export default Message
