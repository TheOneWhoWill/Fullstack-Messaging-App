import React from 'react';
import './Styles/index.scss';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Auth from './pages/Authenticate';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { AuthProvider } from './contexts/AuthContext';
import { Route, Navigate, Outlet, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	function Wrapper() {
		return (
			<div className="mainContent">
				<AuthProvider>
					<Header />
					<Sidebar />
					<Outlet />
				</AuthProvider>
			</div>
		)
	}

  return (
		<Router>
			<div className="App">
				<Routes>
					<Route element={<Wrapper />}>
						<Route path="/" exact element={<Home />} />
						<Route path="/watch/:videoId" element={<Watch />} />
						<Route path="/Home" element={<Navigate to="/" />} />
						<Route path="/Auth/to/:to" element={<Auth />} />
						<Route path="/Upload" element={<Upload />} />
					</Route>
				</Routes>
    	</div>
		</Router>
  );
}

export default App;