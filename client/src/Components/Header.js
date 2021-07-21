import React from 'react';
import { useHistory } from "react-router-dom";
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
	const history = useHistory();
	const { currentUser, logout } = useAuth();

	return (
		<header className="Header">
			<h3 onClick={() => history.push('/')}>Pixels</h3>
			<div className="right">
				{currentUser ? 
					<SignedInBtn
						img={currentUser.photoURL}
						logout={logout}
					/>
					:
					<button
						className="signInBtn"
						onClick={() => history.push('/Login')}
					>
						Log In
					</button>
				}
			</div>
		</header>
	);
}

export default Header;