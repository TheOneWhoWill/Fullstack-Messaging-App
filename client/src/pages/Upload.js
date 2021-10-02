import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Upload() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);
	const [video, setVideo] = useState(null);
	const openModal = () => setIsOpen(true);
	const customStyles = {
  	content: {
   		top: '50%',
   		left: '50%',
   		right: 'auto',
   		bottom: 'auto',
    	marginRight: '-50%',
    	transform: 'translate(-50%, -50%)',
			backgroundColor: '#202020'
  	},
	};

	function fileChangeHandler(e) {
		setVideo(e.target.files[0])
	}

	function fileUpload() {
		const data = new FormData()
		data.append("video", video)
		axios.post(`${process.env.REACT_APP_BASE_URL}/Upload`, data)
	}

	return (
		<div className="Upload">
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="modalOverlay">
				<input type="file" onChange={fileChangeHandler} />
				<button className="uploadBtn" onClick={fileUpload}>Upload</button>
			</Modal>
			<div className="topBar">
				<h2>Profile content</h2>
				<Icon icon={faPlus} onClick={openModal}/>
			</div>
			<div className="files">
				<button>ssssssss</button>
			</div>
		</div>
	)
}

export default Upload;