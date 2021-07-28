import React from 'react'
import { useHistory } from "react-router-dom";

function ListItem(props) {
	const history = useHistory();
	return (
		<div className="chatBtn" onClick={() => history.push(`/Home/${props.channelID}`)}>
			{
				props.image ?
					<img src={props.image} alt="alt" />
					:
					props.channelName[0]
			}
		</div>
	)
}

export default ListItem
