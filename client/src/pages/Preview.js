import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';

function Preview() {
	let { videoId } = useParams();
	const { currentUser } = useAuth();
	let [video, setVideo] = useState(null);
	let [loading, setLoading] = useState(true)
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	useEffect(() => {
		currentUser && currentUser.getIdToken(true)
			.then((idToken) => {
				axios.get(`${process.env.REACT_APP_BASE_URL}/Videos/preview/${videoId}`, {token: idToken})
					.then(result => {
						setLoading(false);
						setVideo(result.data);
					})
					.catch(() => {
						setLoading(false);
					})
			})
			.catch((err) => {
				console.log(err)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId])

	if(!loading && video) {
		return (
			<div className="Watch">
				<div className="videoContainer">
					<video className="video" controls src={`${process.env.REACT_APP_BASE_URL}/Videos/stream/${videoId}/`}></video>
					<div className="contents">
						<h1>{video && video.title}</h1>
						<div className="left">
							Published {months[new Date(video.uploadDate).getMonth()]} {new Date(video.uploadDate).getDate()}, {new Date(video.uploadDate).getFullYear()}
						</div>
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

export default Preview;