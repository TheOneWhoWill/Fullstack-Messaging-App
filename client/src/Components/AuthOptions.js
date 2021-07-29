import axios from 'axios';
import Input from './Input';
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Login(props) {
	let [show, setShow] = useState(false);
	let passwdRef = useRef(null);
	const { login } = useAuth();
	let emailRef = useRef(null);

	function LoginUser() {
		let email = emailRef.current.value;
		let password = passwdRef.current.value;

		login(email, password)
	}

	return (
		<div className="authSection">
			<Input type="email" name="Email" inputRef={emailRef}/>
			<Input type={show ? 'text' : 'password'} name="Password" inputRef={passwdRef}/>
			<div className="bottomOptions">
				<div className="Check">
					<input type="checkbox" className="Check" onClick={() => setShow(!show)}/>
					<label>Show Password</label>
				</div>
				<button className="submitBtn" onClick={() => LoginUser()}>Submit</button>
			</div>
			<h6>New User? <span onClick={() => props.change()}>Register</span></h6>
		</div>
	);
}

function Register(props) {
	const { loginWithToken } = useAuth();
	let [show, setShow] = useState(false);
	let userNameRef = useRef(null);
	let passwdRef = useRef(null);
	let emailRef = useRef(null);

	function RegisterUser() {
		let displayName = userNameRef.current.value;
		let email = emailRef.current.value;
		let password = passwdRef.current.value;
		let request = `${process.env.REACT_APP_BASE_URL}/auth/create/account`;
		let submit = {displayName: displayName, email: email, password: password}

		axios.post(request, submit)
			.then(response => {
				loginWithToken(response.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div className="authSection">
			<Input type="text" name="Username" inputRef={userNameRef}/>
			<Input type="email" name="Email" inputRef={emailRef}/>
			<Input type={show ? 'text' : 'password'} name="Password" inputRef={passwdRef}/>
			<div className="bottomOptions">
				<div className="Check">
					<input type="checkbox" className="Check" onClick={() => setShow(!show)}/>
					<label>Show Password</label>
				</div>
				<button
					className="submitBtn"
					onClick={() => RegisterUser()}
				>
					Submit
				</button>
			</div>
			<h6>Already a User? <span onClick={() => props.change()}>Login</span></h6>
		</div>
	);
}

export { Register, Login }