import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const playerSchema = new Schema({
	socketId: String,
  username: String
});

mongoose.model('Player', playerSchema);
