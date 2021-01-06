import '../App.css';
import React from 'react';
import AlertDialog from './AlertDialog';
import { PropsFooterTodoList } from '../model/type/todo';
import { Todo } from '../model/type/todo';

function FooterTodoList(props: PropsFooterTodoList) {

    const handleChangeFilter = (status: string) => {
        props.onChangeFilter(status);
    }

    const countItemLeft = () => {
        const todoListFilter: Todo[] = props.todoListFilter;
        let count = 0;
        todoListFilter.forEach(e => {
            if (e.isCompleted === false) {
                count++;
            };
        });
        return count;
    };

    return (
        <div className="footer">
            <div className="count-item">{countItemLeft()} items left</div>
            <div className="filter">
                <div onClick={() => handleChangeFilter("all")} className={props.filter === "all" ? "selected" : ""}>All</div>
                <div onClick={() => handleChangeFilter("active")} className={props.filter === "active" ? "selected" : ""}>Active</div>
                <div onClick={() => handleChangeFilter("completed")} className={props.filter === "completed" ? "selected" : ""}> Completed</div>
            </div>
        </div>
    );
};

export default FooterTodoList;