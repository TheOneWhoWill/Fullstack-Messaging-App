import mongoose from 'mongoose';

// Video Schema
const videoSchema = mongoose.Schema({
	uid: {
		required: true,
		type: String
	},
	publishStatus: {
		required: true,
		type: String
	},
	uploadDate: {
		required: true,
		type: Number
	},
	video: {
		required: true,
		type: String
	},
	title: {
		required: true,
		type: String
	}
})

export default mongoose.model('videos', videoSchema);