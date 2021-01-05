import React from 'react';

export interface Todo {
    id: number,
    todoName: string,
    completed: boolean,
    type: string,
    deadline: string
}

export interface PropsContentTodoList {
    todoListFilter: Todo[],
    todoList: Todo[],
    filter: string,
    onDataChange: Function,
    onChangeFilter: Function
}

export interface PropsHeaderTodoList {
    todoList: Todo[],
    onDataChange: Function
}

export interface PropsModalAddTodo {
    todoList: Todo[],
    onDataChange: Function
}

export interface PropsDataTodoListRow {
    todo: Todo,
    key: number,
    todoList: Todo[],
    onDataChange: Function
}

export interface PropsFooterTodoList {
    filter: string,
    todoListFilter: Todo[],
    onChangeFilter: Function
}

export interface PropsAlertDialog {
    todo: Todo,
    todoList: Todo[],
    onDataChange: Function,
    minutesCompare: number
}
