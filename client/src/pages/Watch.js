import React from 'react';
import { useParams } from 'react-router-dom';

function Watch() {
	let { videoId } = useParams();

	return (
		<div className="Watch">
			<video controls src={`${process.env.REACT_APP_BASE_URL}/Videos/${videoId}`}></video>
		</div>
	)
}

export default Watch
