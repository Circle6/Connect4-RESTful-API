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

router.get('/create/:player1.:player2', function(req, res, next) {
  createGame(req.params.player1, req.params.player2, function(game) {
  	res.send( game );
    Mongoose.connection.close();
    console.log('game created!!!');
  });
});

router.get('/delete/:gameId', function(req, res, next) {
  deleteGame(req.params.gameId);
  res.send( 'Game Deleted' );
  console.log('game deleted!!!');
});

router.get('/update/:gameId.:column', function(req, res, next) {
  updateGame(req.params.gameId, req.params.column, function(game) {
    res.send( game );
    Mongoose.connection.close();
    console.log('game updated!!!');
  });
});

export default router;
