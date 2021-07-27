import React from 'react'
import UserTab from './UserTab'

function Sidebar() {
	return (
		<div className="sideBar">
			<div className="chats">
				<div className="chatBtn">A</div>
				<div className="chatBtn">B</div>
				<div className="chatBtn">C</div>
				<div className="chatBtn">D</div>
				<div className="chatBtn">E</div>
				<div className="chatBtn">
					<img
						src="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c"
						alt="img"
					/>
				</div>
			</div>
			<UserTab className="UserTab" />
		</div>
	)
}

export default Sidebar
