const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = require('./app');

const server = http.createServer(app);
server.listen(port);