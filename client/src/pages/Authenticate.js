import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Register, Login } from '../Components/AuthOptions';
//rfce

function OAuthBtn(props) {
	return (
		<button className={"oAuth " + props.cssStyle} onClick={props.signin}>
			<img className="left" src={props.imgSrc} alt="loginImg"/>
			Login with {props.provider}
		</button>
	)
}

function AuthPage() {
	let [newUser, setNew] = useState(false);
	function change() {setNew(!newUser)}
	const { GoogleSignIn, TwitterSignIn, currentUser } = useAuth();

	return (
		<div className="Login">
			<div className="LoginModal">
				<h2 className="loginHeader">{newUser ? "Register" : "Login"}</h2>
				<div className="loginBody">
					<div className="left">
						{newUser ?
							<Register change={change} />
							:
							<Login change={change}/>
						}
					</div>
					<div className="OAuthSection">
						<OAuthBtn
							signin={GoogleSignIn}
							provider="Google"
							cssStyle="google"
							imgSrc="https://img.icons8.com/color/256/000000/google-logo.png"
						/>
						<OAuthBtn
							signin={TwitterSignIn}
							provider="Twitter"
							cssStyle="twitter"
							imgSrc="https://img.icons8.com/ios-filled/256/ffffff/twitter.png"
						/>
					</div>
				</div>
				{currentUser ? <Redirect to="/" /> : <p>By Logging in you agree to our Terms of Service and Privacy Policy</p>}
			</div>
		</div>
	);
}

export default AuthPage;