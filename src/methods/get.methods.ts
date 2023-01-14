import { IncomingMessage, ServerResponse } from "http";
import { userData } from "../users/usersData";
import { validate } from "uuid";
import { IUser } from "../users/users.interface";

function getResponse(
    res: ServerResponse, 
    status: number,
    sendData: IUser | IUser[] | string
  ) {
  res.statusCode = status;
  res.setHeader('Content-type' , 'application/json')
  res.end(JSON.stringify({
    data: sendData,
  }));
}


function getUsers (res: ServerResponse) {
  getResponse(res, 200, userData)
  
}

function getUser (res: ServerResponse, id: string) {
  if (!validate(id)) getResponse(res, 400, "sorry wrong ID");
  if (validate(id)) {
    const user = userData.find(user => user.id === id);
    (user)?
    getResponse(res, 200, user):
    getResponse(res, 404, "User not found");
  } 
}

export {
  getUsers,
  getUser
}