import Modal from 'react-modal';
import { v4 as uuid } from 'uuid';
import Input from '../Components/Input';
import Row from '../Components/VideoRow';
import { useAuth } from '../contexts/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, updateMetadata, deleteObject } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";

function Upload() {
	const [currentProgress, setProgress] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [fileList, setFileList] = useState(null);
	const closeModal = () => setIsOpen(false);
	const [video, setVideo] = useState(null);
	const openModal = () => setIsOpen(true);
	const { currentUser } = useAuth();
	const titleRef = useRef(null);
	const storage = getStorage();
	const db = getFirestore();
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

	function generateRandomFileName() {
		let fileName = `/videos/${currentUser.uid}/${uuid()}.mp4`
		let storageRef = ref(storage, fileName)
		
		getDownloadURL(storageRef)
			.then(foundURL => {
				generateRandomFileName();
			})
			.catch(err => {
				return fileName;
			})
	}

	function handleProgress(snapshot) {
		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		// Shows current upload progress to user
		setProgress('Upload is ' + progress + '% done');
		// If the Upload is Paused it will show it
		if (snapshot.state === 'paused') {
			setProgress('Upload paused');
		}
	}

	function uploadVideo() {
		if(video && titleRef.current.value) {
			let fileName = generateRandomFileName()
			let storageRef = ref(storage, fileName);
			let uploadTask = uploadBytesResumable(storageRef, video);

			setProgress(null)
	
			uploadTask.on('state_changed', (snapshot) => {
					handleProgress(snapshot)
					// If there is a error it just closes the modal
				}, (error) => {
					setProgress('There was a error')
					// Gives half a second waiting period
					setTimeout(() => {
						// Closes Modal after waiting period
						closeModal()
					}, 500);
				}, () => {
					let newMetadata = {
						customMetadata: {
							uid: currentUser.uid
						}
					}
					updateMetadata(storageRef, newMetadata).catch((err) => console.error(err))
				}
			)
		} else {
			console.log("Please fill out every part of the form")
		}
	}

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
				<input type="file" onChange={fileChangeHandler} />
				<button className="uploadBtn" onClick={uploadVideo}>Upload Video</button>
				{currentProgress && <div className="uplaodStatus">{currentProgress}</div>}
			</Modal>
			<div className="topBar">
				<h2>Profile content</h2>
				<Icon icon={faPlus} onClick={openModal}/>
			</div>
			<div className="files">
				{fileList && fileList.map(video => {
					return <Row key={uuid()} video={video}/>
				})}
			</div>
		</div>
	)
}

export default Upload;