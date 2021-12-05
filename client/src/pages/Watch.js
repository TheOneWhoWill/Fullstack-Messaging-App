import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Watch() {
	let { videoId } = useParams();
	let [video, setVideo] = useState(null);
	let [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/Videos/${videoId}`)
			.then(result => {
				setLoading(false);
				setVideo(result);
			})
			.catch(error => {
				setLoading(false);
			})
	}, [videoId])

	if(!loading && video) {
		return (
			<div className="Watch">
				<div className="videoContainer">
					<video className="video" controls src={`${process.env.REACT_APP_BASE_URL}/Videos/stream/${videoId}`}></video>
					<div className="contents">
						<h1>{video && video.title}</h1>
						<div className="info"></div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<h1>404 Video Not Found</h1>
		)
	}
}

export default Watch
