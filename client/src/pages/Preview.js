import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';

function Preview() {
	let { videoId } = useParams();
	const { currentUser } = useAuth();
	let [video, setVideo] = useState(null);
	let [loading, setLoading] = useState(true)
	let [currentToken, setToken] = useState(null);
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	async function getPreview() {
		try {
			let idToken = currentUser && await currentUser.getIdToken(true)
			let result = await axios.post(`${process.env.REACT_APP_BASE_URL}/Videos/preview/${videoId}`, {token: idToken})
			
			setToken(idToken);
			setVideo(result.data);
		} catch (e) {
			throw new Error('Problem with get request')
		}
	}

	useEffect(() => {
		try {
			getPreview()
			setLoading(false);
		} catch (e) {
			alert(e)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId])

	if(!loading && video) {
		return (
			<div className="Watch">
				<div className="videoContainer">
					<video className="video" controls src={`${process.env.REACT_APP_BASE_URL}/Videos/preview/stream/${videoId}/?token=${currentToken && currentToken}`}></video>
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