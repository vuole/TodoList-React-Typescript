import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HeaderTodoList from './component/HeaderTodoList';
import ContentTodoList from './component/ContentTodoList';
import { Todo } from './model/type/todo';

function dataFilter(todoList: Todo[], filter: string): Todo[] {
  if (filter === "all") {
    return todoList.filter(e => { return true });
  } else if (filter === "active") {
    return todoList.filter(e => { return (e.completed === false) });
  } else if (filter === "completed") {
    return todoList.filter(e => { return (e.completed === true) });
  };
  return [];
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const handleDataChange = (todoListChange: Todo[]) => {
    setTodoList(todoListChange);
  };

  const handleChangeFilter = (status: string) => setFilter(status);

  useEffect(() => {
    fetch("http://localhost:3001/todoList")
      .then(res => res.json())
      .then(
        (result) => {
          setTodoList(result.data);
        },
        (error) => {
          console.log("error: ", error);
        }
      )
  }, [])

  return (
    <div className="package">
      <div className="todo-page">
        <HeaderTodoList onDataChange={handleDataChange} todoList={todoList} />
        <ContentTodoList todoListFilter={dataFilter(todoList, filter)} todoList={todoList} filter={filter}
          onDataChange={handleDataChange} onChangeFilter={handleChangeFilter} />
      </div>
    </div>
  );
}

const listData = [
  { id: 1, todoName: "Task a", completed: false, type: "TYPE A", deadline: "2021-01-04T16:08" },
  { id: 2, todoName: "Task b", completed: false, type: "TYPE A", deadline: "2021-02-04T16:08" },
  { id: 3, todoName: "Task c", completed: false, type: "TYPE A", deadline: "2021-03-04T16:08" },
  { id: 4, todoName: "Task d", completed: true, type: "TYPE B", deadline: "2021-04-04T16:08" },
  { id: 5, todoName: "Task e", completed: true, type: "TYPE B", deadline: "2021-05-04T16:08" },
  { id: 6, todoName: "Task f", completed: true, type: "TYPE B", deadline: "2021-06-04T16:08" },
  { id: 7, todoName: "Task g", completed: true, type: "TYPE C", deadline: "2021-07-04T16:08" },
  { id: 8, todoName: "Task h", completed: true, type: "TYPE C", deadline: "2021-08-04T16:08" },
  { id: 9, todoName: "Task m", completed: true, type: "TYPE C", deadline: "2021-09-04T16:08" },
  { id: 10, todoName: "Task n", completed: true, type: "TYPE C", deadline: "2021-10-04T16:08" }
];

export default App;
