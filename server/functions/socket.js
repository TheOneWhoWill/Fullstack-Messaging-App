function handling(io) {
	io.on('connection', (socket) => {
		console.log('Someone Connected')
	})
}

export { handling };