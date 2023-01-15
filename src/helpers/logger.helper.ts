import { IncomingMessage } from 'http';
import { stdout } from 'process';

export default function requestLog(req: IncomingMessage) {
  const message = `Method: ${req.method} \nURL: ${req.url}\n`;
  stdout.write(message);
}
