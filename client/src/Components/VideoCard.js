import React from 'react'

function VideoCard(props) {
	return (
		<div className="videoCard">
			<div className="thumbnail" style={{backgroundImage: `url(${props.img})`}}>
				<div className="timestamp">{props.score}</div>
			</div>
			<div className="bottom">
				<div className="left">
					<img src="https://yt3.ggpht.com/yti/APfAmoH_je2bO18BU0JX-4Aoe4QhGZmuGzI0qVq04T5FhA=s108-c-k-c0x00ffffff-no-rj" alt="s" width="36px"/>
				</div>
				<div className="right">
					<div className="title">
						{props.title}
					</div>
					<div className="publisherName">Studio C</div>
					<div className="generalInfo">{props.views} views • {props.publishedDate}</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard;