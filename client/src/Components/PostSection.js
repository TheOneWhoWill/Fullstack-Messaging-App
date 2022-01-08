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
						img={'https://i.ytimg.com/vi/W41w05uSwzg/hq720.jpg' || `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
						score={10}
						title={show.title}
						audience="TV-14"
						views={2222}
						publishedDate={FriendlyTime(new Date(show.uploadDate.seconds * 1000))}
					/>
				)
			})}
		</div>
	)
}

export default PostSection
