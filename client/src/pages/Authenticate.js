import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
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
	let { to } = useParams();
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	function change() {setNew(!newUser)}
	let [newUser, setNew] = useState(false);
	const { GoogleSignIn, TwitterSignIn } = useAuth();

	return (
		<div className="Login">
			<div className="LoginModal">
				<h2 className="loginHeader">{newUser ? "Register" : "Login"}</h2>
				<div className="loginBody">
					<div className="left">
						{newUser ?
							<Register change={change} to={to} />
							:
							<Login change={change} to={to} />
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
				<p>By Logging in you agree to our Terms of Service and Privacy Policy</p>
			</div>
			{currentUser ? navigate(to ? `/${to}` : '/') : <></>}
		</div>
	);
}

export default AuthPage;