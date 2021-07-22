import React from 'react';
import './Styles/index.scss';
import Body from './pages/Body';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './Components/Header'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Route exact path="/Home" component={Home} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/" component={Body} />
        <Header />
      </BrowserRouter>
    </div>
  );
}

export default App;