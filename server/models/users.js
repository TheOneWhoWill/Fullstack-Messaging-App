import mongoose from 'mongoose';

// User Schema
const messageSchema = mongoose.Schema({
	uid: {
		required: true,
		type: String
	},
	contacts: {
		required: true,
		type: Array
	},
	customInvites: {
		required: false,
		type: Array
	}
})

export default mongoose.model('Users', messageSchema);