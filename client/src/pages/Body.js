import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
//rfce

function Body() {
	const { currentUser } = useAuth();

	return (
		<div className="Body">      
			<h2>Body Page</h2>
			{currentUser && <Redirect to="Home"/>}
		</div>
	);
}

export default Body;