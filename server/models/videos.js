import mongoose from 'mongoose';

// Video Schema
const videoSchema = mongoose.Schema({
	uid: {
		required: true,
		type: String
	},
	video: {
		required: true,
		type: Object
	},
	title: {
		required: true,
		type: String
	},
	publishStatus: {
		required: true,
		type: String
	}
})

export default mongoose.model('videos', videoSchema);