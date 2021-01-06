import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HeaderTodoList from './component/HeaderTodoList';
import ContentTodoList from './component/ContentTodoList';
import { Todo } from './model/type/todo';
import { getTodoList } from './service/todo-service'

function dataFilter(todoList: Todo[], filter: string, keySearch: string): Todo[] {
  if (filter === "all") {
    return todoList.filter(e => { return e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  } else if (filter === "active") {
    return todoList.filter(e => { return (e.isCompleted === false) && e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  } else if (filter === "completed") {
    return todoList.filter(e => { return (e.isCompleted === true) && e.todoName.toUpperCase().indexOf(keySearch.toUpperCase()) > -1 });
  };
  return [];
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [keySearch, setKeySearch] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleChangeFilter = (status: string) => setFilter(status);

  const handleChangeKeySearch = (key: string) => setKeySearch(key);

  const handleChangeRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    getTodoList().then(res => setTodoList(res.data));
  }, [refresh]);

  return (
    <div className="package">
      <div className="todo-page">
        <HeaderTodoList onChangeKeySearch={handleChangeKeySearch} onChangeRefresh={handleChangeRefresh} />
        <ContentTodoList todoListFilter={dataFilter(todoList, filter, keySearch)} filter={filter}
          onChangeFilter={handleChangeFilter} onChangeRefresh={handleChangeRefresh} />
      </div>
    </div>
  );
}

export default App;
