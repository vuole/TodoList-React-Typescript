import '../App.css';
import React from 'react';
import ModalAddTodo from './ModalAddTodo';
import { PropsHeaderTodoList } from '../model/type/todo';
import { Todo } from '../model/type/todo';

function HeaderTodoList(props: PropsHeaderTodoList) {
    return (
        <div className="header-todolist">
            <a data-toggle="collapse" href="#collapseOne">
                <i className='fas fa-angle-down'></i>
      Todo List
        {/* <form>
                    <input className="search" type="text" name="search" placeholder="Search.." />
                </form> */}
            </a>
            <ModalAddTodo todoList={props.todoList} onDataChange={props.onDataChange} />
        </div>
    );
}
export default HeaderTodoList;