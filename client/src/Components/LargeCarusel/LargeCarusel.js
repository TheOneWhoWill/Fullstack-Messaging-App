import axios from 'axios';
import firebase from 'firebase';
import Title from './LargeTitle';
import React, { useState, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

function LargeCarusel(props) {
	const [titles, setTitles] = useState();
	let baseURL = process.env.REACT_APP_BASE_URL;
	let currentUser = firebase.auth().currentUser;

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
		currentUser && currentUser.getIdToken(true)
			.then(token => {
				request(token)
			})
			.catch(err => {
				console.log(err)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props, baseURL])

	return (
		<div className="LargeCaruselContainer">
			<ScrollContainer hideScrollbars={false} className="Carusel">
				{titles && titles.map(title => {
					return (
						<Title key={title.id} title={title.name ? title.name : title.title && title.title} img={title.backdrop_path}/>
					)
				})}
			</ScrollContainer>
		</div>
	)
}

export default LargeCarusel
