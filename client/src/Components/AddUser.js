import React from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';


function AddUser() {
	return (
		<div className="addUserBtn chatBtn">
			<Icon icon={faUserPlus}/>
		</div>
	)
}

export default AddUser
