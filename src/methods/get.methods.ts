import { ServerResponse } from 'http';
import { validate } from 'uuid';
import userData from '../users/usersData';
import { IUser } from '../users/users.interface';

function getResponse(
  res: ServerResponse,
  status: number,
  sendData: IUser | IUser[] | string,
) {
  res.statusCode = status;
  res.setHeader('Content-type', 'application/json');
  res.end(JSON.stringify({
    data: sendData,
  }));
}

function getUsers(res: ServerResponse) {
  getResponse(res, 200, userData);
}

function getUser(res: ServerResponse, id: string) {
  if (!validate(id)) getResponse(res, 400, 'sorry wrong ID');
  if (validate(id)) {
    const user = userData.find((e) => e.id === id);
    if (!user) getResponse(res, 404, 'User not found');
    if (user) getResponse(res, 200, user);
  }
}

export {
  getUsers,
  getUser,
};
