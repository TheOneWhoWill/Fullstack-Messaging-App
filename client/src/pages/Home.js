import Carusel from '../Components/Carusel';
import LargeCarusel from '../Components/LargeCarusel/LargeCarusel.js';

function Home() {

	return (
		<div className="Home">
			<LargeCarusel query="/Titles/Popular/TV"/>
			<Carusel name="Trending Now" query="/Titles/Trending"/>
			<Carusel name="Trending TV Shows" query="/Titles/Trending/TV"/>
		</div>
	)
}

export default Home