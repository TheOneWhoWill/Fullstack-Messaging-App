import axios from 'axios'
import Sidebar from '../Components/Sidebar'
import React, { useEffect, useState } from 'react'

function VideoCard(props) {
	return (
		<div className="videoCard">
			<div className="thumbnail" style={{backgroundImage: `url(${props.img})`}}>
				<div className="timestamp">{props.score}</div>
			</div>
			<div className="bottom">
				<div className="left">
					<img src="https://yt3.ggpht.com/yti/APfAmoH_je2bO18BU0JX-4Aoe4QhGZmuGzI0qVq04T5FhA=s108-c-k-c0x00ffffff-no-rj" alt="s" width="40px"/>
				</div>
				<div className="right"></div>
			</div>
		</div>
	)
}

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
			<Sidebar />
			<div className="main">
				{shows && shows.map(show => {
					return (
						<VideoCard
							img={`https://image.tmdb.org/t/p/w400/${show.backdrop_path}`}
							score={show.vote_average}
							title={show.name}
							lang={show.original_language}
							audience="TV-14"
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Home