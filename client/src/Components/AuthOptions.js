import Input from './Input'
import { useState } from 'react';

function Login(props) {
	let [show, setShow] = useState(false);

	return (
		<div className="authSection">
			<Input type="email" name="Email" />
			<Input type={show ? 'text' : 'password'} name="Password" />
			<div className="bottomOptions">
				<div className="Check">
					<input type="checkbox" className="Check" onClick={() => setShow(!show)}/>
					<label>Show Password</label>
				</div>
				<button className="submitBtn">Submit</button>
			</div>
			<h6>New User? <span onClick={() => props.change()}>Register</span></h6>
		</div>
	);
}

function Register(props) {
	let [show, setShow] = useState(false);

	return (
		<div className="authSection">
			<Input type="text" name="Username" />
			<Input type="email" name="Email" />
			<Input type={show ? 'text' : 'password'} name="Password" />
			<div className="bottomOptions">
				<div className="Check">
					<input type="checkbox" className="Check" onClick={() => setShow(!show)}/>
					<label>Show Password</label>
				</div>
				<button className="submitBtn">Submit</button>
			</div>
			<h6>Already a User? <span onClick={() => props.change()}>Login</span></h6>
		</div>
	);
}

function AuthSwitch() {
	let [newUser, setNew] = useState(false);
	function change() {setNew(!newUser)}

	return newUser ? <Register change={change} /> : <Login change={change} />
}

export default AuthSwitch