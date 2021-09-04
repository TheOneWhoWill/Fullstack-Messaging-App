import React from 'react'
import UserTab from './UserTab';

function Sidebar() {
	return (
		<div className="Header">
			<h2>Pixels</h2>
			<UserTab className="UserTab" />
		</div>
	)
}

export default Sidebar