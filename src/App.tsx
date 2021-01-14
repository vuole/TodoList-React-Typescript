import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HeaderTodoList from './component/HeaderTodoList';
import ContentTodoList from './component/ContentTodoList';
import { Todo } from './model/type/todo';
import { gql, useQuery } from '@apollo/client';

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

const GET_TODO_LIST = gql`
  query{
    getTodoList {
      id
      todoName
      isCompleted
      type
      deadline
    }
  }
`;

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [keySearch, setKeySearch] = useState<string>("");

  const handleChangeFilter = (status: string) => setFilter(status);

  const handleChangeKeySearch = (key: string) => setKeySearch(key);

  const refreshTodoList = () => refetch();

  const { data, refetch } = useQuery(GET_TODO_LIST, { fetchPolicy: "network-only" });
  // console.log(data ? data.getTodoList : 'no data');

  useEffect(() => {
    setTodoList(data ? data.getTodoList : []);
  });

  return (
    <div className="package">
      <div className="todo-page">
        <HeaderTodoList onChangeKeySearch={handleChangeKeySearch} onChangeRefresh={refreshTodoList} />
        <ContentTodoList todoListFilter={dataFilter(todoList, filter, keySearch)} filter={filter}
          onChangeFilter={handleChangeFilter} onChangeRefresh={refreshTodoList} />
      </div>
    </div>
  );
}

export default App;
