import React from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../contexts/AuthContext';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function SignedInBtn(props) {
	const history = useHistory();

	if(props.img) {
		return (
			<div className="right">
				<Icon onClick={history.push('/Upload')} icon={faCloudUploadAlt} className="HeaderIcon" />
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
						<div className="item">
							Upload
						</div>
						<div className="item" onClick={() => props.logout()}>
							Sign Out
						</div>
					</Dropdown.Menu>
				</Dropdown>
			</div>
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