import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HeaderTodoList from './component/HeaderTodoList';
import ContentTodoList from './component/ContentTodoList';
import { Todo } from './model/type/todo';

function dataFilter(todoList: Todo[], filter: string, keySearch: string): Todo[] {
  if (filter === "all") {
    return todoList.filter(e => { return e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  } else if (filter === "active") {
    return todoList.filter(e => { return (e.completed === false) && e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  } else if (filter === "completed") {
    return todoList.filter(e => { return (e.completed === true) && e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  };
  return [];
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [keySearch, setKeySearch] = useState<string>("");

  const handleDataChange = (todoListChange: Todo[]) => {
    setTodoList(todoListChange);
  };

  const handleChangeFilter = (status: string) => setFilter(status);

  const handleChangeKeySearch = (key: string) => setKeySearch(key);

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
        <HeaderTodoList onDataChange={handleDataChange} todoList={todoList} onChangeKeySearch={handleChangeKeySearch} />
        <ContentTodoList todoListFilter={dataFilter(todoList, filter, keySearch)} todoList={todoList} filter={filter}
          onDataChange={handleDataChange} onChangeFilter={handleChangeFilter} />
      </div>
    </div>
  );
}

export default App;
