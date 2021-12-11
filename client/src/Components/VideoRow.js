import React from 'react'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function VideoRow(props) {
	let video = props.video

	return (
		<div className="videoRow">
			<div className="left">
			<h3 className="title">{video.title}</h3>
				<p className="publishingStaus">Publishing Status: {video.publishStatus}</p>
				<span className="rowBtn">Edit <Icon icon={faEdit} className="editIcon" /></span>
				<span className="rowBtn">Publish</span>
				<a className="previewLink" href={`preview/${video._id}`}>Preview</a>
			</div>
			<div className="thumbnail">
				<img src="https://i.ytimg.com/vi/e-EAUxynFck/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDaHZj7l2cByEK8XY0TXH4T7Bxd-Q" alt="1"/>
			</div>
		</div>
	)
}

export default VideoRow;