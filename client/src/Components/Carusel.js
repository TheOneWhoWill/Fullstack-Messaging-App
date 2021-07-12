import axios from 'axios';
import Title from './Title'
import firebase from 'firebase'
import React, { useState, useEffect, useRef } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
//rfce

function Carusel(props) {
	const caruselRef = useRef();
	const [titles, setTitles] = useState();
	let baseURL = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		// API Call
		function request(token) {
			axios.get(`${baseURL}${props.query}?token=${token}`)
				.then(res => {
					setTitles(res.data)
				})
				.catch(err => {
					console.log(err)
				})
		}
		// Fettching the JWT
		firebase.auth().currentUser && firebase.auth().currentUser.getIdToken(true)
			.then(token => {
				request(token)
			})
			.catch(err => {
				console.log(err)
			})
	}, [props, baseURL])

	return (
		<div className="CaruselContainer">
			<h2 className="CaruselTitle">{props.name}</h2>
			<ScrollContainer hideScrollbars={false} className="Carusel" ref={caruselRef}>
				{titles && titles.map(title => {
					return (
						<Title key={title.id} title={title.name ? title.name : title.title && title.title} img={title.poster_path}/>
					)
				})}
			</ScrollContainer>
		</div>
	)
}

export default Carusel