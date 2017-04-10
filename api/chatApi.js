import config from '../config';
import Mongoose from 'mongoose';

/*
/ Used to create a new Chat. Takes a chatId that is identical to it's
/ associated gameId and creates a chat. Returns the Chat document.
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
/ Used to find a Chat. Takes a chatId that is identical to it's
/ associated gameId and finds that chat. Returns the Chat document.
*/
export const findChat = (chatId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Chat = Mongoose.model('Chat');

	Chat.findById( chatId, function( err, chat ) {
		callback( chat );
	});
}

/*
/ Used to delete a chat once finished or upon player disconnect.Takes
/ a chatId and deletes it from the Mongodb. Returns "chat deleted".
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
/ Used to update a Chat when a message is entered. Takes a chatId and
/ a message object containing username, player status, and message text.
/ pushes to the chat array and returns the updated chat.
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
