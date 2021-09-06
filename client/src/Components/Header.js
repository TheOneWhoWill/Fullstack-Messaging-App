import React from 'react'
import UserTab from './UserTab';

function Header() {
	return (
		<div className="Header">
			<h3>Pixels</h3>
			<UserTab className="UserTab" />
		</div>
	)
}

export default Header