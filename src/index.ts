import http from "http";
import { IUser } from "./users/users.interface";
import { checkURL } from "./helpers/checkers.helper";


const PORT = 8000;
const dataArray: IUser[] = [
  {userName: 'Tony', age: 23, hobbies: []},
];

const server = http.createServer((req, res) => {
  if(req.url){
    console.log('Method: ', req.method);
    console.log('Address: ', req.url); 

    if(checkURL(req.url)){
      switch (req.method) {
        case "GET":{
            res.statusCode = 200;
            res.setHeader('Content-type' , 'application/json');
            res.end(JSON.stringify({
              data: dataArray,
            }));
            break;
          };
          case "POST": {
            let newUser = "";

            req.setEncoding('utf-8')
            req.on('data', (chunk)=> {
              newUser += chunk;
            });
            req.on('end', () => {
              const parsed = JSON.parse(newUser);
              dataArray.push(parsed);
            });

            res.statusCode = 201;
            res.setHeader('Content-type' ,'application/json');
            res.end(JSON.stringify({
              data: "well, it's a post",
            }));
            break;
          };
        };
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