import React from 'react'

function Input(props) {
	return (
		<div className="input">
			<input
				autocomplete="off"
				placeholder=" "
				className="inputFeild"
				ref={props.inputRef}
				type={props.type}
				id={props.type}
			/>
			<label className="formLabel" for={props.type}>{props.name}</label>
		</div>
	)
}

export default Input
