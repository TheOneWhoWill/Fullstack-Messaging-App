import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Auth from './pages/Authenticate';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


function App() {
	let HomeRedirect = () => <Redirect to="/"/>

  return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Sidebar />
				<div className="mainContent">
					<Route exact path="/Auth/to/:to" component={Auth} />
					<Route exact path="/Home" component={HomeRedirect} />
					<Route exact path="/Upload" component={Upload} />
					<Route exact path="/" component={Home} />
				</div>
			</BrowserRouter>
    </div>
  );
}

export default App;