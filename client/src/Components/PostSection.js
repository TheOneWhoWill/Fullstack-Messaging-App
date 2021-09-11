import React from 'react'
import VideoCard from './VideoCard';
import FriendlyTime from '../functions/GetTime';

function PostSection(props) {
	let shows = props.shows;

	return (
		<div className="postSection">
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
		</div>
	)
}

export default PostSection
