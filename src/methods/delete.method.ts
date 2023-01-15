import { ServerResponse } from 'http';
import { validate } from 'uuid';
import sendResponse from '../helpers/response.helper';
import userData from '../users/usersData';

export default function deleteUser(res: ServerResponse, id: string) {
  if (!validate(id)) sendResponse(res, 400, 'sorry wrong ID');
  if (validate(id)) {
    const user = userData.find((e) => e.id === id);
    const userIndex = userData.findIndex((e) => e.id === id);
    if (!user) sendResponse(res, 404, 'User not found');
    if (user) {
      userData.splice(userIndex, 1);
      sendResponse(res, 204, 'User Deleted');
    }
  }
}