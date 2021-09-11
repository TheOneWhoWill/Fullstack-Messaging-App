import React from 'react'
import UserTab from './UserTab';
import { Link } from 'react-router-dom';

function Header() {

	return (
		<div className="Header">
			<Link to="/"><h3>Pixels</h3></Link>
			<UserTab className="UserTab" />
		</div>
	)
}

export default Header