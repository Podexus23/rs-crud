import http from "http";
import { IUser } from "./users/users.interface";


const PORT = 8000;
const dataArray: IUser[] = [
  {userName: 'Tony', age: 23, hobbies: []},
];

const server = http.createServer((req, res) => {
  if(req.method === "GET") {
    if(req.url === "/api/users"){
      res.statusCode = 200;
      res.setHeader('Content-type' ,'application/json');
      res.end(JSON.stringify({
        data: dataArray,
      }))
    }
  } else if(req.method === "POST") {
    if(req.url === "/api/users"){
      let newUser = "";

      req.setEncoding('utf-8')
      req.on('data', (chunk)=> {
        newUser += chunk;
      })
      req.on('end', () => {
        const parsed = JSON.parse(newUser);
        dataArray.push(parsed);
      })

      res.statusCode = 200;
      res.setHeader('Content-type' ,'application/json');
      res.end(JSON.stringify({
        data: "well, it's a post",
      }))
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({
        data: "well, it's a post, but url is wrong",
      }))
    }
  } else {
    res.writeHead(404, { 'Content-type': 'application/json'});
    res.end(JSON.stringify({
      data: "Sorry address not found",
    }));
  }
  
})

server.listen(PORT);