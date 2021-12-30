import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostSection from '../Components/PostSection';

function Home() {
	const [shows, setShows] = useState(null);
	const apiKey = "e41d212ee3b5aac234bf7d9f8467ee59"

	useEffect(() => {
		axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`)
			.then(response => {
				setShows(response.data.results.sort((a, b) => b.popularity - a.popularity))
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