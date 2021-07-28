import React from 'react'

function Input(props) {
	return (
		<div className="input">
			<input ref={props.inputRef} type={props.type} id={props.type} placeholder="  c"/>
			<label for={props.type}>{props.name}</label>
		</div>
	)
}

export default Input
