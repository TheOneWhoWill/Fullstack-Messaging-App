import React from 'react'
import ChatBtn from './ChatBtn'
import UserTab from './UserTab'
import AddUser from './AddUser'

function Sidebar() {
	return (
		<div className="sideBar">
			<div className="chats">
				<ChatBtn channelName="Fds" channelID='2331232231' />
				<ChatBtn channelName="t" channelID='2331232864' image="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c" />
				<AddUser />
			</div>
			<UserTab className="UserTab" />
		</div>
	)
}

export default Sidebar