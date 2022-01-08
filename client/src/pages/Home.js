import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostSection from '../Components/PostSection';
import { collection, getFirestore, query, where, onSnapshot } from "firebase/firestore"

function Home() {
	const db = getFirestore();
	const [shows, setShows] = useState(null);
	const [videos, setVideos] = useState(null);
	const apiKey = "e41d212ee3b5aac234bf7d9f8467ee59"

	useEffect(() => {
		axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`)
			.then(response => {
				setShows(response.data.results.sort((a, b) => b.popularity - a.popularity))
			})
			.catch(error => console.log(error))

		onSnapshot(query(collection(db, "videos"), where("publishStatus", "==", "Published")), (snapshot) => {
			setVideos(
				// doc.data() converts the query into regular json data
				// I am also destructuring it to add a id field from the doc id
				snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
			)
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="Home">
			<PostSection shows={videos} />
		</div>
	)
}

export default Home