import http from "http";
import { IUser } from "./users/users.interface";
import { checkURL, checkNewUserData } from "./helpers/checkers.helper";
import {v1} from 'uuid';
import { requestLog } from "./helpers/logger.helper";
import { urlController } from "./controller/url.controller";

const PORT = 8000;
const dataArray: IUser[] = [
  {userName: 'Tony', age: 23, hobbies: [], id: '7c186260-942f-11ed-b879-91858c42770e'},
  {userName: 'Boo', age: 12, hobbies: ["some hobbies"], id: "fbf589e0-942f-11ed-b879-91858c42770e"},
];

const server = http.createServer((req, res) => {
  requestLog(req);
  urlController(req, res);
  if(req.url){
    if(checkURL(req.url)){
      switch (req.method) {
          case "POST": {
            let newUser = "";

            req.setEncoding('utf-8')
            req.on('data', (chunk)=> {
              newUser += chunk;
            });
            req.on('end', () => {
              const parsed = JSON.parse(newUser);
              console.log("user check: ", checkNewUserData(newUser))
              parsed.id = v1();
              dataArray.push(parsed);
            });

            res.statusCode = 201;
            res.setHeader('Content-type' ,'application/json');
            res.end(JSON.stringify({
              data: "well, it's a post",
            }));
            break;
          }
        }
      } else {
        res.statusCode = 404;
        res.setHeader('Content-type' ,'application/json');
        res.end(JSON.stringify({
          data: "well, it's a post, but url is wrong",
        }))
      }
    }  
})

server.listen(PORT);