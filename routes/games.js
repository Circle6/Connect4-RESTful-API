import express from 'express';
import Mongoose from 'mongoose';
const router = express.Router();

import { createGame, findGame, deleteGame, updateGame } from '../api/gameApi';

router.get('/find/:gameId', function(req, res, next) {
  findGame(req.params.gameId, function(game) {
    res.send( game );
    Mongoose.connection.close();
    console.log('game found!!!');
  });
});

router.post('/create/', function(req, res, next) {
  createGame(req.body.player1, req.body.player2, function(game) {
  	res.send( game );
    Mongoose.connection.close();
    console.log('game created!!! ' + game._id);
  });
});

router.get('/delete/:socketId', function(req, res, next) {
  deleteGame(req.params.socketId, function(game) {
    res.send( game );
    Mongoose.connection.close();
    console.log('game deleted!!!');
  });
});

router.get('/update/:gameId.:column', function(req, res, next) {
  updateGame(req.params.gameId, req.params.column, function(game) {
    res.send( game );
    Mongoose.connection.close();
    console.log('game updated!!!');
  });
});

export default router;
