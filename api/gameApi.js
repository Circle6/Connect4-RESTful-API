import config from '../config';
import Mongoose from 'mongoose';

/*
/ Finds the top empty row given a board and a column to place a piece. If
/ there is no empty row, returns -1, otherwise returns the index of the row.
*/
function findEmptyRow(board, column) {
  let emptyRow = -1;
  for (let row = 0; row < board.length; row++) {
    if (board[row][column] == "empty") {
      emptyRow = row;
    }
  }
  return emptyRow;
}

/*
/ Checks to see if a player won. Takes a board [String][String], row, column
/ and player (String). Returns true of false.
*/
function checkVictory(board, row, column, player) {

  // Types of victories
  let horizontal = 1;
  let upLeft = 1;
  let vertical = 1;
  let upRight = 1;

  // horizontal check
  try {
    let colLeft = column - 1;
    while (board[row][colLeft] == player){
      horizontal++;
      colLeft--;
    }
  } catch (err) {
    // nothing
  }
  try {
    let colRight = column + 1;
    while (board[row][colRight] == player){
      horizontal++;
      colRight++;
    }
  } catch (err) {
    // nothing
  }
  if (horizontal >= 4) {return true};

  // left up diagonal check
  try {
    let colLeft = column - 1;
    let rowUp = row - 1;
    while (board[rowUp][colLeft] == player){
      upLeft++;
      colLeft--;
      rowUp--;
    }
  } catch (err) {
    // nothing
  }
  try {
    let colRight = column + 1;
    let rowDown = row + 1;
    while (board[rowDown][colRight] == player){
      upLeft++;
      colRight++;
      rowDown++;
    }
  } catch (err) {
    // nothing
  }
  if (upLeft >= 4) {return true};

  // vertical check
  try {
    let rowUp = row - 1;
    while (board[rowUp][column] == player){
      vertical++;
      rowUp--;
    }
  } catch (err) {
    // nothing
  }
  try {
    let rowDown = row + 1;
    while (board[rowDown][column] == player){
      vertical++;
      rowDown++;
    }
  } catch (err) {
    // nothing
  }
  if (vertical >= 4) {return true};

  // right up diagonal check
  try {
    let colLeft = column - 1;
    let rowDown = row + 1;
    while (board[rowDown][colLeft] == player){
      upRight++;
      colLeft--;
      rowDown++;
    }
  } catch (err) {
    // nothing
  }
  try {
    let colRight = column + 1;
    let rowUp = row - 1;
    while (board[rowUp][colRight] == player){
      upRight++;
      colRight++;
      rowUp--;
    }
  } catch (err) {
    // nothing
  }
  if (upRight >= 4) {return true};

  return false;
}

/*
/ Used to create a new game. Takes 2 player id's (currently strings,
/ but later will be updated to use ObjectId's) and creates a game,
/ returning that game's ObjectId.
*/
export const createGame = (player1, player2, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Game = Mongoose.model('Game');

	const game = new Game({
		player1,
		player2,
		status: "player1",
		victory: "N/A",
  		board: [
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    	  [ "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
    	]
	});

	game.save( function (err, newGame) {

		if(err) {
			console.log("Ruh Roh");
		}
    Game.populate( newGame, { path: 'player1 player2' }, function (err, newGame) {
      callback( newGame );
    });
	});
};

/*
/ Used to find a new game. Takes a gameId (ObjectId) and returns a JSON
/ string containing all current game data.
*/
export const findGame = (gameId, callback) => {

	Mongoose.connect(config.mongodbUri);
	const Game = Mongoose.model('Game');

	Game.findById(gameId).populate('player1 player2').exec(function( err, game ) {
		callback( game );
	});
}

/*
/ Used to delete a game once finished. Takes a gameId (ObjectId) and
/ deletes it from the Mongodb. Returns "game deleted".
*/
export const deleteGame = (gameId) => {

	Mongoose.connect(config.mongodbUri);
	const Game = Mongoose.model('Game');

	Game.remove( { _id: gameId }, function(err) {
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
export const updateGame = (gameId, column, callback) => {

	findGame(gameId, function(game) {

		const row = findEmptyRow(game.board, column);

		// Check to see if the move was valid, if not respond with "null"
		if (row == -1) {
			callback( "null" );
		} else {

			// Workaround to update board
			let rowUpdate = game.board[row];
			rowUpdate[column] = game.status;
			game.board.set(row, rowUpdate);

			// If game is won, set victory status to the active player
			if (checkVictory(game.board, row, column, game.status)) {
				game.victory = game.status;
			}

			// Toggles active player
			if (game.status == "player1") {
				game.status = "player2";
			} else {
				game.status = "player1";
			}

			// Stores game
			game.save( function (err, updatedGame) {
				if (err) {
					console.log("errr we had a problem");
				} else {
					callback( updatedGame );
				}
			});
		}

	});
}
