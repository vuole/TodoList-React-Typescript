// import { TypeTodo } from "./type";

'use strict';

var http = require('http');
var express = require('express');
// Create Express webapp.
var app = express();
require('dotenv').load();
var Enum = require('enum');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// some hard coded user details
// const users = [
//   { identity: "user1", role: "user" },
//   { identity: "user2", role: "user" },
//   { identity: "user3", role: "user" },
//   { identity: "user4", role: "user" },
//   { identity: "user5", role: "user" },
//   { identity: "admin", role: "host" }
// ];

var TypeTodo = new Enum({ A: "TYPE A", B: "TYPE B", C: "TYPE C" });

const listTypeTodo = [
  { key: "A", value: TypeTodo.A.value },
  { key: "B", value: TypeTodo.B.value },
  { key: "C", value: TypeTodo.C.value }
];

const todoList = [
  { id: 1, todoName: "Task a", isCompleted: false, type: TypeTodo.A.value, deadline: "2021-01-04T16:08" },
  { id: 2, todoName: "Task b", isCompleted: false, type: TypeTodo.A.value, deadline: "2021-01-04T16:08" },
  { id: 3, todoName: "Task c", isCompleted: false, type: TypeTodo.A.value, deadline: "2021-03-04T16:08" },
  { id: 4, todoName: "Task d", isCompleted: true, type: TypeTodo.B.value, deadline: "2021-04-04T16:08" },
  { id: 5, todoName: "Task e", isCompleted: true, type: TypeTodo.B.value, deadline: "2021-05-04T16:08" },
  { id: 6, todoName: "Task f", isCompleted: true, type: TypeTodo.B.value, deadline: "2021-06-04T16:08" },
  { id: 7, todoName: "Task g", isCompleted: true, type: TypeTodo.C.value, deadline: "2021-07-04T16:08" },
  { id: 8, todoName: "Task h", isCompleted: true, type: TypeTodo.C.value, deadline: "2021-08-04T16:08" },
  { id: 9, todoName: "Task m", isCompleted: true, type: TypeTodo.C.value, deadline: "2021-09-04T16:08" },
  { id: 10, todoName: "Task n", isCompleted: true, type: TypeTodo.C.value, deadline: "2021-10-04T16:08" }
];

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

app.get('/getListTypeTodo', function (request, response) {
  return response.status(200).send({
    status: "success",
    data: listTypeTodo
  })
});

app.get('/todoList', function (request, response) {
  return response.status(200).send({
    status: "success",
    data: todoList
  })
});

app.post('/todoList', function (request, response) {
  const keyTypeTodo = request.body.type;
  const todoNew = Object.assign({ id: todoList[todoList.length - 1].id + 1, isCompleted: false }, request.body);
  todoNew["type"] = TypeTodo[keyTypeTodo].value;
  // console.log(todoNew);
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
  const status = request.body.isCompleted;
  const index = todoList.findIndex(e => e.id == id);
  todoList[index].isCompleted = status;
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
