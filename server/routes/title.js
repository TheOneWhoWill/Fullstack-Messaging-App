import axios from 'axios';
import express from 'express';

const router = express.Router()

router.get('/Trending', async (req, res) => {
	//console.log(req.locals.uid)
	let query = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDBApiKey}`
	//res.send(query)
  axios.get(query)
		.then(popular => {
			res.json(popular.data.results.sort((a, b) => b.popularity - a.popularity))
		})
		.catch(error => {
			console.log(error)
		})
})

router.get('/Popular/TV', async (req, res) => {
	// Query Params
	let genre = 18;
	let voteAvg = 10;
	let query = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDBApiKey}&vote_average=${voteAvg}&with_genres=${genre}`
	// Query
	axios.get(query)
		.then(popular => {
			res.json(popular.data.results)
		})
		.catch(error => {
			console.log(error)
		})
})

router.get('/Trending/TV', async (req, res) => {
	let query = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDBApiKey}`
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