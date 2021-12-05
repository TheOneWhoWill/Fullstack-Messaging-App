import axios from 'axios';
import express from 'express';
import Videos from '../models/videos.js';

const router = express.Router()

router.get('/TV/', async (req, res) => {
	let query = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDBApiKey}&language=en-US`
	//res.send(query)
  axios.get(query)
		.then(popular => {
			res.json(popular.data.results.sort((a, b) => b.popularity - a.popularity))
		})
		.catch(error => {
			console.log(error)
		})
})

export default router;