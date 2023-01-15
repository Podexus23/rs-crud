import { IncomingMessage, ServerResponse } from 'http';
import { getUser, getUsers } from '../methods/get.methods';
import postUser from '../methods/post.methods';
import sendResponse from '../helpers/response.helper';

const LINKS = {
  main: '/api/users',
};

export default function urlController(req: IncomingMessage, res: ServerResponse) {
  const address = req.url;
  const fixedAddress = address?.replace('$', '');
  const id = fixedAddress?.split('/')[3];

  if (
    !fixedAddress?.includes(LINKS.main)
    || address === '/api/users/'
  ) sendResponse(res, 404, 'Sorry. Page not found');

  if (req.method === 'GET') {
    if ((fixedAddress === LINKS.main)) getUsers(res);
    if (fixedAddress?.includes(LINKS.main) && id) getUser(res, id);
  }

  if (req.method === 'POST') {
    if ((fixedAddress === LINKS.main)) postUser(req, res);
  }
}
