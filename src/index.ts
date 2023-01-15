import http from 'http';
import * as dotenv from 'dotenv';
import requestLog from './helpers/logger.helper';
import urlController from './controller/url.controller';
import sendResponse from './helpers/response.helper';

dotenv.config();

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  try {
    requestLog(req);
    urlController(req, res);
  } catch {
    sendResponse(res, 500, 'Sorry internal Error. Server went down');
  }
});

server.listen(port);
console.log(`Server is working on Port: ${port}`);
