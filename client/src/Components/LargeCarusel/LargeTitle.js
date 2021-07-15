import React from 'react'

function LargeTitle(props) {
	return (
		<div className="LargeTitle">
			{props.img && 
				<img
					src={`http://image.tmdb.org/t/p/w780${props.img}`}
					alt=""
				/>
			}
			{props.img === undefined &&
				<h4>{props.title}</h4>
			}
			<div className="TopLevel"></div>
		</div>
	)
}

export default LargeTitle
