import Input from './Input'
import { useState } from 'react';

function Login() {
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
			<h6>New User? <span>Register</span></h6>
		</div>
	);
}



export default Login