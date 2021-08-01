import mongoose from 'mongoose';

// Message Schema
const messageSchema = mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	recipient: {
		type: Object,
		required: false
	},
	body: {
		type: String,
		required: true
	},
	members: Array
})

export default mongoose.model('messages', messageSchema);