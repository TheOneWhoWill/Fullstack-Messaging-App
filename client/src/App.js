import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Body from './pages/Body';
import Login from './pages/Login';
import { useHistory } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';

function HomeAuthenticated() {
	const history = useHistory();
	const { currentUser } = useAuth();
	
	if(currentUser) {
		return <Home/>
	} else {
		history.push('/Login')
		return <p>Sign in to View Page</p>
	}
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Route exact path="/Home" component={HomeAuthenticated} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/" component={Body} />
      </BrowserRouter>
    </div>
  );
}

export default App;