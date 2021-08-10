function initialize(socket) {
	console.log('went through')
	socket.on('message', () => {
		console.log('message sent')
	})
}

export { initialize };