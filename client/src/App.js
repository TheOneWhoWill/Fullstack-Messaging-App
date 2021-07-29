import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Body from './pages/Body';
import Auth from './pages/Authenticate';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	const { currentUser } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
				<Route exact path="/Home" component={currentUser ? Home : Auth} />
				<Route exact path="/Auth" component={Auth} />
				<Route exact path="/" component={Body} />
      </BrowserRouter>
    </div>
  );
}

export default App;