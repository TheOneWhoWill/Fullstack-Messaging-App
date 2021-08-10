function initialize(socket, io) {
	socket.on('message', (message) => {
		io.to(message.socketID).emit('message', message)
	})
}

export { initialize };