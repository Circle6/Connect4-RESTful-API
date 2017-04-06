import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const chatSchema = new Schema({
	_id: Schema.ObjectId,
	chatData: [{
		user: String,
		status: String,
		text: String
	}]
});

mongoose.model('Chat', chatSchema);
