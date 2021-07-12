import React from 'react'

function Title(props) {
	return (
		<div className="Title">
			{props.img && 
				<img
					src={`http://image.tmdb.org/t/p/w200${props.img}`}
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

export default Title
