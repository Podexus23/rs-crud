import http from 'http';
import requestLog from './helpers/logger.helper';
import urlController from './controller/url.controller';

const PORT = 8000;

const server = http.createServer((req, res) => {
  requestLog(req);
  urlController(req, res);
});

server.listen(PORT);
console.log(`Server is working on Port: ${PORT}`);
