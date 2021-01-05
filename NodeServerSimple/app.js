// import { TypeTodo } from "./type";

'use strict';

var http = require('http');
var express = require('express');
// Create Express webapp.
var app = express();

require('dotenv').load();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// some hard coded user details
const users = [
  { identity: "user1", role: "user" },
  { identity: "user2", role: "user" },
  { identity: "user3", role: "user" },
  { identity: "user4", role: "user" },
  { identity: "user5", role: "user" },
  { identity: "admin", role: "host" }
];

const todoList = [
  { id: 1, todoName: "Task a", completed: false, type: "TYPE A", deadline: "2021-01-04T16:08" },
  { id: 2, todoName: "Task b", completed: false, type: "TYPE A", deadline: "2021-01-04T16:08" },
  { id: 3, todoName: "Task c", completed: false, type: "TYPE A", deadline: "2021-03-04T16:08" },
  { id: 4, todoName: "Task d", completed: true, type: "TYPE B", deadline: "2021-04-04T16:08" },
  { id: 5, todoName: "Task e", completed: true, type: "TYPE B", deadline: "2021-05-04T16:08" },
  { id: 6, todoName: "Task f", completed: true, type: "TYPE B", deadline: "2021-06-04T16:08" },
  { id: 7, todoName: "Task g", completed: true, type: "TYPE C", deadline: "2021-07-04T16:08" },
  { id: 8, todoName: "Task h", completed: true, type: "TYPE C", deadline: "2021-08-04T16:08" },
  { id: 9, todoName: "Task m", completed: true, type: "TYPE C", deadline: "2021-09-04T16:08" },
  { id: 10, todoName: "Task n", completed: true, type: "TYPE C", deadline: "2021-10-04T16:08" }
];
// enum TypeTodo {
//   typeA = "TYPE A",
//   typeB = "TYPE B",
//   typeC = "TYPE C"
// }

// const todoList = [
//   { id: 1, content: "Task a", completed: false, type: TypeTodo.typeA, deadline: "2021-01-04T16:08" },
//   { id: 2, content: "Task b", completed: false, type: TypeTodo.typeA, deadline: "2021-02-04T16:08" },
//   { id: 3, content: "Task c", completed: false, type: TypeTodo.typeA, deadline: "2021-03-04T16:08" },
//   { id: 4, content: "Task d", completed: true, type: TypeTodo.typeB, deadline: "2021-04-04T16:08" },
//   { id: 5, content: "Task e", completed: true, type: TypeTodo.typeB, deadline: "2021-05-04T16:08" },
//   { id: 6, content: "Task f", completed: true, type: TypeTodo.typeB, deadline: "2021-06-04T16:08" },
//   { id: 7, content: "Task g", completed: true, type: TypeTodo.typeC, deadline: "2021-07-04T16:08" },
//   { id: 8, content: "Task h", completed: true, type: TypeTodo.typeC, deadline: "2021-08-04T16:08" },
//   { id: 9, content: "Task m", completed: true, type: TypeTodo.typeC, deadline: "2021-09-04T16:08" },
//   { id: 10, content: "Task n", completed: true, type: TypeTodo.typeC, deadline: "2021-10-04T16:08" }
// ];

app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
});

app.get('/', function (request, response) {
  response.status(200).json({ status: "sucess", body: "App is running" })
})

app.get('/getUsers', function (request, response) {
  // const identity = request.query.identity

  // if (!identity) {
  // return response.status(400).send({
  // status: "error",
  // body: "identity is required..."
  // })
  // }

  // const user = users.find(user => user.identity === identity)

  // if (!user) {
  // return response.status(400).send({
  // status: "error",
  // body: "identity not found"
  // })
  // }

  return response.status(200).send({
    status: "success",
    data: users
  })
});

app.get('/todoList', function (request, response) {
  return response.status(200).send({
    status: "success",
    data: todoList
  })
});

app.post('/todoList', function (request, response) {
  const todoNew = Object.assign({ id: todoList[todoList.length - 1].id + 1, completed: false }, request.body);
  todoList.push(todoNew);
  return response.status(200).send({
    status: "success",
    data: todoNew
  })
});

app.delete('/todoList/:id*?', function (request, response) {
  const id = request.query.id;
  const index = todoList.findIndex(e => e.id == id);
  todoList.splice(index, 1);
  return response.status(200).send({
    status: "success"
  })
});

app.put('/todoList/:id*?', function (request, response) {
  const id = request.query.id;
  const status = request.body.completed;
  const index = todoList.findIndex(e => e.id == id);
  todoList[index].completed = status;
  return response.status(200).send({
    status: "success"
  })
});

// Create http server and run it.
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Express server running on *:' + port);
});