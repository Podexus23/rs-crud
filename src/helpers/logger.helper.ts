import { IncomingMessage } from 'http';


function requestLog(req: IncomingMessage) {
  console.log(
    `Method: ${req.method}
    URL: ${req.url}
    `
  );
};

export {
  requestLog
}