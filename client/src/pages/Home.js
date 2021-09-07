import axios from 'axios'
import FriendlyTime from '../functions/GetTime';
import VideoCard from '../Components/VideoCard';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
	const [page, setPage] = useState(1);
	const [shows, setShows] = useState(null);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/Feed/TV/${page}`)
			.then(response => {
				setShows(response.data)
			})
			.catch(error => console.log(error))
	}, [])

	function getMore() {
		setPage(page + 1)
		console.log(page)
		axios.get(`${process.env.REACT_APP_BASE_URL}/Feed/TV/${page}`)
			.then(response => {
				setShows([...shows, response.data])
			})
			.catch(error => console.log(error))
	}

	return (
		<div className="Home">
			<InfiniteScroll
				className="postSection"
				dataLength={999}
				hasMore={true}
				loader={<p>Loading...</p>}
				next={() => getMore()}
			>
				{shows && shows.map(show => {
					return (
						<VideoCard
							img={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
							score={show.vote_average}
							title={show.name}
							lang={show.original_language}
							audience="TV-14"
							views={show.vote_count}
							publishedDate={FriendlyTime(new Date(show.first_air_date))}
						/>
					)
				})}
			</InfiniteScroll>
		</div>
	)
}

export default Home