import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { updateMetadata } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function VideoRow(props) {
	let db = props.db;
	let video = props.video;
	let storageRef = props.storageRef;
	const { currentUser } = useAuth();
	let docRef = doc(db, "videos", video.id)

	function publishVideo() {
		updateDoc(docRef, { publishStatus: "Published" }).catch(err => console.error(err))
		// Custom Metadata
		let newMetadata = {
			customMetadata: {
				uid: currentUser.uid,
				publishStatus: "Published"
			}
		}
		// Adds custom metadata needed for preview security rules
		updateMetadata(storageRef, newMetadata)
			.catch(err => {
				console.log(err)
			})
	}

	function unpublishVideo() {
		updateDoc(docRef, { publishStatus: "Unpublished" }).catch(err => console.error(err))
		// Custom Metadata
		let newMetadata = {
			customMetadata: {
				uid: currentUser.uid,
				publishStatus: "Unpublished"
			}
		}
		// Adds custom metadata needed for preview security rules
		updateMetadata(storageRef, newMetadata)
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div className="videoRow">
			<div className="left">
			<h3 className="title">{video.title}</h3>
				<p className="publishingStaus">Publishing Status: {video.publishStatus}</p>
				<span className="rowBtn">Edit <Icon icon={faEdit} className="editIcon" /></span>
				{video.publishStatus === "Published" ? 
					<span className="rowBtn" onClick={unpublishVideo}>Unpublish</span>
					:
					<span className="rowBtn" onClick={publishVideo}>Publish</span>
				}
				<a className="previewLink" href={`watch/${video.id}`}>Preview</a>
			</div>
			<div className="thumbnail">
				<img src="https://i.ytimg.com/vi/e-EAUxynFck/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDaHZj7l2cByEK8XY0TXH4T7Bxd-Q" alt="1"/>
			</div>
		</div>
	)
}

export default VideoRow;