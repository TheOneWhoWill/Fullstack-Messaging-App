import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostSection from '../Components/PostSection';

function Home() {
	const [shows, setShows] = useState(null);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/Feed/TV`)
			.then(response => {
				setShows(response.data)
			})
			.catch(error => console.log(error))
	}, [])

	return (
		<div className="Home">
			<PostSection shows={shows} />
		</div>
	)
}

export default Home