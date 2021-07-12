//import 'sass';
import App from './App';
import React from 'react';
import './Styles/index.scss'
import ReactDOM from 'react-dom';
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);