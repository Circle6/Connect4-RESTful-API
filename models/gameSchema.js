import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const gameSchema = new Schema({
	player1: {
		type: Schema.ObjectId,
		ref: 'Player'
	},
	player2: {
		type: Schema.ObjectId,
		ref: 'Player'
	},
	status: String,
	victory: String,
	board: [[String]]
});

mongoose.model('Game', gameSchema);
