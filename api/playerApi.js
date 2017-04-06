import config from '../config';
import Mongoose from 'mongoose';

/*
/ Used to create a new game. Takes 2 player id's (currently strings,
/ but later will be updated to use ObjectId's) and creates a game,
/ returning that game's ObjectId.
*/
export const createPlayer = (username, socketId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Player = Mongoose.model('Player');

	const player = new Player({
		username,
		socketId
	});

	player.save( function (err, newPlayer) {

		if(err) {
			console.log("Ruh Roh");
		}

		callback( newPlayer );
	});
};

/*
/ Used to find a new game. Takes a gameId (ObjectId) and returns a JSON
/ string containing all current game data.
*/
export const findPlayer = (playerId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Player = Mongoose.model('Player');

	Player.findById( playerId, function( err, player ) {
		callback( player );
	});
}

/*
/ Used to delete a game once finished. Takes a gameId (ObjectId) and
/ deletes it from the Mongodb. Returns "game deleted".
*/
export const deletePlayer = (playerId) => {

	Mongoose.connect(config.mongodbUri);
	const Player = Mongoose.model('Player');

	Player.remove( { _id: playerId }, function(err) {
		if (err) {
			console.log("it didn't work");
		}
		Mongoose.connection.close();
	});
}

/*
/ Used to update a game when a move is made. Takes a gameId (ObjectId),
/ the player making the move (String), and the [row][column] where the
/ move is being made. Returns the updated game.
*/
export const updatePlayer = (playerId, socketId, callback) => {

  Mongoose.connect(config.mongodbUri);
	const Player = Mongoose.model('Player');

  Player.findOneAndUpdate({ _id: playerId }, { $set : { socketId }}, {new: true}, function(err, doc) {
    callback(doc);
  })
}
