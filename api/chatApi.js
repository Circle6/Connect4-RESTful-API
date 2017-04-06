import config from '../config';
import Mongoose from 'mongoose';

/*
/ Used to create a new game. Takes 2 player id's (currently strings,
/ but later will be updated to use ObjectId's) and creates a game,
/ returning that game's ObjectId.
*/
export const createChat = (chatId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Chat = Mongoose.model('Chat');

	const chat = new Chat({
		_id: chatId,
		chatData: []
	});

	chat.save( function (err, newChat) {

		if(err) {
			console.log("Ruh Roh");
		}

		callback( newChat );
	});
};

/*
/ Used to find a new game. Takes a gameId (ObjectId) and returns a JSON
/ string containing all current game data.
*/
export const findChat = (chatId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Chat = Mongoose.model('Chat');

	Chat.findById( chatId, function( err, chat ) {
		callback( chat );
	});
}

/*
/ Used to delete a game once finished. Takes a gameId (ObjectId) and
/ deletes it from the Mongodb. Returns "game deleted".
*/
export const deleteChat = (chatId) => {

	Mongoose.connect(config.mongodbUri);
	const Chat = Mongoose.model('Chat');

	Chat.remove( { _id: chatId }, function(err) {
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
export const updateChat = (chatId, message, callback) => {

  findChat(chatId, function(chat) {

		chat.chatData.push(message);

		chat.save( function (err, updatedChat) {
			if (err) {
				console.log("errr we had a problem");
			} else {
				callback( updatedChat );
			}
		});
	});
}
