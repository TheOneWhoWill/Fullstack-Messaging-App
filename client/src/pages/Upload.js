import axios from 'axios';
import Modal from 'react-modal';
import Input from '../Components/Input'; 
import Row from '../Components/VideoRow';
import { useAuth } from '../contexts/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Upload() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [fileList, setFileList] = useState(null);
	const closeModal = () => setIsOpen(false);
	const [video, setVideo] = useState(null);
	const openModal = () => setIsOpen(true);
	const { currentUser } = useAuth();
	const titleRef = useRef(null);
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
		// Get id token to add to form data
		currentUser && currentUser.getIdToken(true).then((idToken) => {
			let data = new FormData();
			data.append("video", video)
			data.append("title", titleRef.current.value)
			axios({
				url: `${process.env.REACT_APP_BASE_URL}/Upload?token=${idToken}`,
				method: 'POST',
				data: data,
				body: data
			})
			.then(res => {
				closeModal()
				alert(res.data)
			})
			.catch(err => {
				alert(err)
				console.log(err)
			})
		}).catch((error) => {
			console.log(error)
		});
	}

	useEffect(() => {
		currentUser && currentUser.getIdToken(true).then((idToken) => {
			axios.post(`${process.env.REACT_APP_BASE_URL}/Upload/get`, {token: idToken})
				.then(response => {
					setFileList(response.data)
				})
				.catch(error => {
					console.log(error)
				})
		})
		.catch(err => console.log(err))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="Upload">
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="modalOverlay">
				<Input type="text" name="Title" inputRef={titleRef} />
				<input type="file" onChange={fileChangeHandler} />
				<button className="uploadBtn" onClick={fileUpload}>Upload Video</button>
			</Modal>
			<div className="topBar">
				<h2>Profile content</h2>
				<Icon icon={faPlus} onClick={openModal}/>
			</div>
			<div className="files">
				{fileList && fileList.map(video => {
					return <Row video={video}/>
				})}
			</div>
		</div>
	)
}

export default Upload;