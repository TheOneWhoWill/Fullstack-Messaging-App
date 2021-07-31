import axios from 'axios';
import ChatBtn from './ChatBtn'
import UserTab from './UserTab'
import AddUser from './AddUser'
import React, { useState, useEffect } from 'react'

function Sidebar() {
	const [users, setUsers] = useState(null)
	useEffect(() => {
		let request = `${process.env.REACT_APP_BASE_URL}/auth/get/users`

		axios.get(request)
			.then(res => {
				if(typeof res.data[0] !== undefined) {
					console.log(true)
					setUsers(res.data)
				}
			})
	})
	return (
		<div className="sideBar">
			<div className="chats">
				{users && users.map(user => {
					return (
						<ChatBtn channelName={user.displayName} channelID={user.uid} image={user.photoURL}/>
					)
				})}
				<ChatBtn channelName="t" channelID='2331232864' image="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c" />
			</div>
			<div className="sidebarBottom">
				<AddUser />
				<UserTab className="UserTab" />
			</div>
		</div>
	)
}

export default Sidebar