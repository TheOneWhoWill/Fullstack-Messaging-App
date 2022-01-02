import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function SignedInBtn(props) {
	let [image, setImage] = useState(null);

	async function createBlob() {
		try {
			const result = await fetch(props.currentUser.photoURL)
			const blob = await result.blob();
			let objURL = URL.createObjectURL(blob);
			return objURL;
		} catch (e) {
			throw new Error(`Image Not Loaded`) 
		}
	}

	useEffect(() => {
		createBlob()
			.then(res => {
				console.log(res)
			})
			.catch(() => {
				setImage(`https://lh3.googleusercontent.com/ogw/ADea4I6Pesr4iU69bQqnSZAdJstK_YBS6LHAT8fU7i1XoA=s333-c-mo`)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if(props.currentUser) {
		return (
			<div className="right">
				<Link to="Upload"><Icon icon={faCloudUploadAlt} className="HeaderIcon" /></Link>
				<Dropdown>
					<Dropdown.Toggle childBsPrefix="." variant="success" id="dropdown-basic">
						<img
							className="profileImage"
							src={image}
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
			currentUser={currentUser}
			img={currentUser && currentUser.photoURL}
			logout={logout}
			uid={currentUser && currentUser.uid}
			displayName={currentUser && currentUser.displayName}
		/>
	)
}

export default Header;