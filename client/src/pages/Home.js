import Carusel from '../Components/Carusel';

function Home() {

	return (
		<div className="Home">
			<Carusel name="Trending Now" query={'/Titles/Trending'}/>
			<Carusel name="Trending TV Shows" query={'/Titles/Trending/TV'}/>
		</div>
	)
}

export default Home