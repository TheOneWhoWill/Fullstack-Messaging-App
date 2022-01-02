import Modal from 'react-modal';
import { v4 as uuid } from 'uuid';
import Input from '../Components/Input';
import Row from '../Components/VideoRow';
import { useAuth } from '../contexts/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, updateMetadata } from "firebase/storage";
import { addDoc, collection, getFirestore, serverTimestamp, query, where, onSnapshot } from "firebase/firestore"

function Upload() {
	const [currentProgress, setProgress] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
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

	async function generateRandomFileName() {
		let fileName = `/videos/${currentUser.uid}/${uuid()}.mp4`
		let storageRef = ref(storage, fileName)

		try {
			await getDownloadURL(storageRef)

			generateRandomFileName()
		} catch (e) {
			return fileName
		}
	}

	async function uploadVideo() {
		if(video && titleRef.current.value) {
			let fileName = await generateRandomFileName()
			let storageRef = ref(storage, fileName);
			let uploadTask = uploadBytesResumable(storageRef, video);
			
			uploadTask.on('state_changed', (snapshot) => {
				setProgress(null)
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// Shows current upload progress to user
				setProgress(progress + '% done');
				// If the Upload is Paused it will show it
				if (snapshot.state === 'paused') {
					setProgress('Paused');
				}
				// If there is a error it just closes the modal
			}, (error) => {
				setProgress('There was a error')
				// Gives half a second waiting period
				setTimeout(() => {
					// Closes Modal after waiting period
					closeModal()
				}, 500);
			}, () => {
				let videoData = {
					uid: currentUser.uid,
					video: storageRef.fullPath,
					publishStatus: "Unpublished",
					title: titleRef.current.value,
					uploadDate: serverTimestamp()
				}
				addDoc(collection(db, "videos"), videoData)
					.catch(err => {
						console.log(err)
					})
				// Custom Metadata
				let newMetadata = {
					customMetadata: {
						uid: currentUser.uid,
						publishStatus: "Unpublished"
					}
				}
				// Adds custom metadata needed for preview security rules
				updateMetadata(storageRef, newMetadata)
					.catch(err => {
						console.log(err)
					})
			})
		} else {
			console.log("Please fill out every part of the form")
		}
	}

	useEffect(() => {
		onSnapshot(query(collection(db, "videos"), where("uid", "==", currentUser.uid)), (snapshot) => {
			setFileList(
				// doc.data() converts the query into regular json data
				// I am also destructuring it to add a id field from the doc id
				snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
			)
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
					return <Row key={uuid()} video={video} storageRef={ref(storage, video.video)} db={db}/>
				})}
			</div>
		</div>
	)
}

export default Upload;