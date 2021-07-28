import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Body from './pages/Body';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	const { currentUser } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
				<Route exact path="/Home" component={currentUser ? Home : Login} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/" component={Body} />
      </BrowserRouter>
    </div>
  );
}

export default App;