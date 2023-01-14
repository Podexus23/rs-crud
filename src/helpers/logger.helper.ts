import { IncomingMessage } from 'http';

export default function requestLog(req: IncomingMessage) {
  console.log(
    `Method: ${req.method}
    URL: ${req.url}
    `,
  );
}
