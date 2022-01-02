import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Watch() {
	let db = getFirestore();
	let { videoId } = useParams();
	const [videoData, setVideo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [videoURL, setVideoURL] = useState(true);
	let videoRef = doc(db, "videos", videoId);
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	useEffect(() => {
		async function getVidData() {
			let vidSnap = await getDoc(videoRef);
			if(vidSnap.exists()) {
				setVideo(vidSnap.data());
				// Process to get video URL
				// Proper references to file
				let storage = getStorage();
				let pathReference = ref(storage, videoData.video);
				// Get URL
				getDownloadURL(pathReference)
					.then(url => {
						setVideoURL(url)
					})
					.catch(err => {
						console.error(err);
					})
			} else {
				setVideo(null)
			}
			setLoading(false)
		}
		getVidData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if(loading) {
		return (
			<div className="Watch">
				<h3>Loading...</h3>
			</div>
		)
	} else if(!loading && videoData === null) {
		return (
			<div className="Watch">
				<h3>Video Not Found, Sorry :(</h3>
			</div>
		)
	} else if(!loading && videoData) {
		// Upload Date Variables Required
		let videoUploadDate = videoData.uploadDate.seconds;
		let videoDate = new Date(videoUploadDate).getDate();
		let videoMonth = new Date(videoUploadDate).getMonth();
		let videoYear = new Date(videoUploadDate).getFullYear();

		return (
			<div className="Watch">
				<div className="videoContainer">
					{videoURL && <video className="video" controls src={videoURL}></video>}
					<div className="contents">
						<h1>{videoData.title}</h1>
						<div className="left">
							Published {months[videoMonth]} {videoDate}, {videoYear}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Watch;