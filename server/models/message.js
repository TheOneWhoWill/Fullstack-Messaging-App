import mongoose from 'mongoose';

// Message Schema
let messageSchema = mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	isGroup: {
		type: Boolean,
		required: true
	},
	group: {
		type: String,
		required: false
	},
	recipient: {
		type: String,
		required: false
	},
	body: {
		type: String,
		required: true
	}
})

export default mongoose.model('messages', messageSchema);