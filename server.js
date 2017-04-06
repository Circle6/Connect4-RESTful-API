import config from './config';
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

import games from './routes/games';
import players from './routes/players';
import chats from './routes/chats';

const server = express();

fs.readdirSync(__dirname + '/models').forEach( function(fileName) {
	if (~fileName.indexOf('.js')) require (__dirname + '/models/' + fileName)
});

server.get('/', (req, res) => {
  res.send("<h1>WOOOOOOOOO</h1>");
});

server.use( bodyParser.json() );

server.use('/games', games);
server.use('/players', players);
server.use('/chats', chats);

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
