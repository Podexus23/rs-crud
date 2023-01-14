import { IncomingMessage, ServerResponse } from "http";
import { getUser, getUsers } from "../methods/get.methods";

const LINKS = {
  main: '/api/users',
}

function urlController (req: IncomingMessage, res: ServerResponse) {
  const address = req.url;
  const fixedAddress = address?.replace('$', '');
  const id = fixedAddress?.split('/')[3];
  if((address === LINKS.main) && req.method === "GET") getUsers( res);
  if(fixedAddress?.includes(LINKS.main) && id) getUser(res, id);
}

export {
  urlController
}