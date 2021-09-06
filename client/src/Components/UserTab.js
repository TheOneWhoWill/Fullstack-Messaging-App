import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../contexts/AuthContext';

function SignedInBtn(props) {
	if(props.img) {
		return (
			<Dropdown>
				<Dropdown.Toggle childBsPrefix="." variant="success" id="dropdown-basic">
					<img
						className="profileImage"
						src={props.img}
						alt="ProfilePic"
					/>
				</Dropdown.Toggle>
				<Dropdown.Menu className="menu">
					<div className="item" onClick={() => alert('s')}>
						Account
					</div>
					<div className="item" onClick={() => props.logout()}>
						Sign Out
					</div>
					<div className="item" onClick={() => alert('s')}>
						Help Center
					</div>
				</Dropdown.Menu>
			</Dropdown>
		)
	} else {
		return <Link className="signInBtn" to={`/Auth/to/Home`}>Sign In</Link>
	}
}

function Header() {
	const { currentUser, logout } = useAuth();

	return (
		<SignedInBtn
			img={currentUser && currentUser.photoURL}
			logout={logout}
			uid={currentUser && currentUser.uid}
			displayName={currentUser && currentUser.displayName}
		/>
	)
}

export default Header;