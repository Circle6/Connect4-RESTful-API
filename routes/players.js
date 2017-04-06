import express from 'express';
import Mongoose from 'mongoose';
const router = express.Router();

import { createPlayer, findPlayer, deletePlayer, updatePlayer } from '../api/playerApi';

router.get('/find/:playerId', function(req, res, next) {
  findPlayer(req.params.playerId, function(player) {
    res.send( player );
    Mongoose.connection.close();
    console.log('player found!!!');
  });
});

router.get('/create/:username.:socketId', function(req, res, next) {
  createPlayer(req.params.username, req.params.socketId, function(player) {
  	res.send( player );
    Mongoose.connection.close();
    console.log('player created!!!');
  });
});

router.get('/delete/:playerId', function(req, res, next) {
  deletePlayer(req.params.playerId);
  res.send( 'Player Deleted' );
  console.log('player deleted!!!');
});

router.get('/update/:playerId.:socketId', function(req, res, next) {
  updatePlayer(req.params.playerId, req.params.socketId, function(player) {
    res.send( player );
    Mongoose.connection.close();
    console.log('player updated!!!');
  });
});

export default router;
