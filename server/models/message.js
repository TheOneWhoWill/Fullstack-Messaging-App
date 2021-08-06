import mongoose from 'mongoose';

// Message Schema
const messageSchema = mongoose.Schema({
	sender: {
		type: Object,
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
	timestamp: Number,
	members: Array
})

export default mongoose.model('messages', messageSchema);