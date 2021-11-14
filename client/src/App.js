import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Auth from './pages/Authenticate';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	let HomeRedirect = () => <Route to="/"/>

  return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Header />
					<Sidebar />
					<div className="mainContent">
						<Routes>
							<Route exact path="/watch/:videoId" component={Watch} />
							<Route exact path="/Home" component={HomeRedirect} />
							<Route exact path="/Auth/to/:to" component={Auth} />
							<Route exact path="/Upload" component={Upload} />
							<Route exact path="/" component={Home} />
						</Routes>
					</div>
				</AuthProvider>
			</Router>
    </div>
  );
}

export default App;