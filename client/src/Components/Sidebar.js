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
					setUsers(res.data)
				}
			})
	})
	return (
		<div className="sideBar">
			<div className="chats">
				{users && users.map(user => {
					return (
						<ChatBtn key={user.uid} channelName={user.displayName} channelID={user.uid} image={user.photoURL}/>
					)
				})}
			</div>
			<div className="sidebarBottom">
				<AddUser />
				<UserTab className="UserTab" />
			</div>
		</div>
	)
}

export default Sidebar