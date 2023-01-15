import { IncomingMessage, ServerResponse } from 'http';
import { v1 } from 'uuid';
import sendResponse from '../helpers/response.helper';
import userData from '../users/usersData';
import { checkNewUserData } from '../helpers/checkers.helper';

export default function postUser(req: IncomingMessage, res: ServerResponse) {
  let newUser = '';
  req.setEncoding('utf-8');

  req.on('error', (err) => err);
  req.on('data', (chunk) => { newUser += chunk; });
  req.on('end', () => {
    const isUser = checkNewUserData(newUser);
    if (isUser) {
      isUser.id = v1();
      userData.push(isUser);
      sendResponse(res, 201, 'New record created');
    } else {
      sendResponse(res, 400, 'Body does not contain required fields');
    }
  });
}
