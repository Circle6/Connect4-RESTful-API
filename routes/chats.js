import express from 'express';
import Mongoose from 'mongoose';
const router = express.Router();

import { createChat, findChat, deleteChat, updateChat } from '../api/chatApi';

router.get('/find/:chatId', function(req, res, next) {
  findChat(req.params.chatId, function(chat) {
    res.send( chat );
    Mongoose.connection.close();
    console.log('chat found!!!');
  });
});

router.get('/create/:chatId', function(req, res, next) {
  createChat( req.params.chatId, function(chat) {
  	res.send( chat );
    Mongoose.connection.close();
    console.log('chat created!!!');
  });
});

router.get('/delete/:chatId', function(req, res, next) {
  deleteChat(req.params.chatId);
  res.send( 'Chat Deleted' );
  console.log('chat deleted!!!');
});

router.post('/update/', function(req, res, next) {
  updateChat( req.body.chatId, req.body.message, function(chat) {
    res.send( chat );
    Mongoose.connection.close();
    console.log('chat updated!!!');
  });
});

export default router;
