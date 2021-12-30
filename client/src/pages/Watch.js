import React from 'react';

function Watch() {
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	return (
		<div className="Watch">
			<div className="videoContainer">
				<video className="video" controls src="https://supabase.com/docs/videos/storage/policies.mp4"></video>
				<div className="contents">
					<h1>This is the video Title</h1>
					<div className="left">
						Published {months[new Date(1638580134406).getMonth()]} {new Date(1638580134406).getDate()}, {new Date(1638580134406).getFullYear()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Watch;