import axios from 'axios';
import express from 'express';

const router = express.Router()

router.get('/TV/:page', async (req, res) => {
	let query = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDBApiKey}&language=en-US&page=${req.params.page}`
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