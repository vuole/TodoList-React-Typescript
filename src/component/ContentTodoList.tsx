import '../App.css';
import React from 'react';
import DataTodoListRow from './DataTodoListRow';
import FooterTodoList from './FooterTodoList';
import { Todo } from '../model/type/todo';
import { PropsContentTodoList } from '../model/type/todo';

function ContentTodoList(props: PropsContentTodoList) {
    const rows: JSX.Element[] = [];
    props.todoListFilter.forEach((e: Todo) => {
        rows.push(<DataTodoListRow todo={e} key={e.id} onChangeRefresh={props.onChangeRefresh} />)
    });
    return (
        <div>
            <ul id="collapseOne" className="collapse">
                {rows}
            </ul>
            <FooterTodoList todoListFilter={props.todoListFilter}
                filter={props.filter} onChangeFilter={props.onChangeFilter} />
        </div>
    );
}

export default ContentTodoList;
