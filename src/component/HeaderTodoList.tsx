import '../App.css';
import React, { useRef, useState } from 'react';
import ModalAddTodo from './ModalAddTodo';
import { PropsHeaderTodoList } from '../model/type/todo';
import { Todo } from '../model/type/todo';

function HeaderTodoList(props: PropsHeaderTodoList) {
    const searchHeaderEl = useRef(document.createElement("div"));
    const inputEl = useRef(document.createElement("input"));
    const [keySearch, setKeySearch] = useState("");

    const onSearchActiveClick = () => {
        searchHeaderEl.current.style.display = "flex";
        inputEl.current.focus();
    };

    const onSearchHiddenClick = () => {
        searchHeaderEl.current.style.display = "none";
    };

    const handleChangeInput = (event: any) => {
        setKeySearch(event.target.value);
    };

    const searchTodo = () => {
        props.onChangeKeySearch(keySearch);
    };

    return (
        <div className="header-todolist">
            <a data-toggle="collapse" href="#collapseOne">
                <i className='fas fa-angle-down'></i>
      Todo List
            </a>
            <i className="fas fa-search search-active" aria-hidden="true" onClick={onSearchActiveClick}></i>
            <div className="search-header" ref={searchHeaderEl}>
                <div className="search">
                    <i className="fas fa-arrow-left" aria-hidden="true" onClick={onSearchHiddenClick}></i>
                    <input type="text" placeholder="Search..." value={keySearch} onChange={handleChangeInput} ref={inputEl} />
                    <div className="button" data-toggle="tooltip" data-placement="bottom" title="Search" onClick={searchTodo}>
                        <i className="fas fa-search search-button" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <ModalAddTodo todoList={props.todoList} onDataChange={props.onDataChange} />
        </div>
    );
}
export default HeaderTodoList;