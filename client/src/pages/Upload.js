import axios from 'axios';
import Modal from 'react-modal';
import Input from '../Components/Input'; 
import Row from '../Components/VideoRow';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Upload() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [fileList, setFileList] = useState(null);
	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);
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

	useEffect(() => {
		setFileList([
			{
				uid: "bmN87QL0MIR299Mb6pwYazsE9no1",
				video: "uploads/bmN87QL0MIR299Mb6pwYazsE9no1/videoplayback.mp4",
				publishStatus: "Unpublished",
				title: "This is a video on the row",
				uploadDate: 1638580134406
			}
		])
	}, [])

	return (
		<div className="Upload">
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="modalOverlay">
				<Input type="text" name="Title" inputRef={titleRef} />
				<input type="file" onChange={console.log('dd')} />
				<button className="uploadBtn" onClick={console.log('dds')}>Upload Video</button>
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