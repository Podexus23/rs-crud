import http from 'http';
import * as dotenv from 'dotenv';
import requestLog from './helpers/logger.helper';
import urlController from './controller/url.controller';
// import sendResponse from './helpers/response.helper';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    requestLog(req);
    urlController(req, res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Errors on the server side that occur during the processing of a request' }));
    res.end();
  }
});

server.listen(port);
console.log(`Server is working on Port: ${port}`);

export { server, port };
