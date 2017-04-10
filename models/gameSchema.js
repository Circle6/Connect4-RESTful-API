import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const gameSchema = new Schema({
	player1: {
		socketId: String,
	  username: String
	},
	player2: {
		socketId: String,
		username: String
	},
	status: String,
	victory: String,
	board: [[String]]
});

mongoose.model('Game', gameSchema);
