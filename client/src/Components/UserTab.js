import React from 'react';
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
		return <img className="profileImage" src="https://lh3.googleusercontent.com/a-/AOh14Gh4AMmiTs7xghlj45muuEGWp7GQYQ3D6yhC7xwCww=s96-c" alt="ProfilePic" />
	}
}

function Header() {
	const { currentUser, logout } = useAuth();

	return (
		<SignedInBtn
			img={currentUser.photoURL}
			logout={logout}
			uid={currentUser.uid}
			displayName={currentUser.displayName}
		/>
	)
}

export default Header;