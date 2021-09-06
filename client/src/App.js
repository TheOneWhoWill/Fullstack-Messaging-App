import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Body from './pages/Body';
import Chat from './pages/Chat';
import Auth from './pages/Authenticate';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	const { currentUser } = useAuth();
  return (
    <div className="App">
			<Header />
			<Sidebar />
			<div className="mainContent">
				<BrowserRouter>
					<Route exact path="/Chat/:id" component={currentUser ? Chat : Auth} />
					<Route exact path="/Home" component={currentUser ? Home : Auth} />
					<Route exact path="/Auth" component={Auth} />
					<Route exact path="/" component={Body} />
      	</BrowserRouter>
			</div>
    </div>
  );
}

export default App;