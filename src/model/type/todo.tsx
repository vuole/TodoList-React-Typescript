import React from 'react';

export interface Todo {
    id: number,
    todoName: string,
    isCompleted: boolean,
    type: string,
    deadline: string
}

export interface TodoIsCompleted {
    isCompleted: boolean
}

export interface TodoAdd {
    type: string,
    todoName: string,
    deadline: string
}

export interface ErrorFormTodo {
    type: string,
    todoName: string,
    deadline: string,
    formIsValid: boolean
}

export interface TypeTodo {
    key: string,
    value: string
}

export interface PropsContentTodoList {
    todoListFilter: Todo[],
    filter: string,
    onChangeFilter: Function,
    onChangeRefresh: Function
}

export interface PropsHeaderTodoList {
    onChangeKeySearch: Function,
    onChangeRefresh: Function
}

export interface PropsModalAddTodo {
    onChangeRefresh: Function
}

export interface PropsDataTodoListRow {
    todo: Todo,
    key: number,
    onChangeRefresh: Function
}

export interface PropsFooterTodoList {
    filter: string,
    todoListFilter: Todo[],
    onChangeFilter: Function
}

export interface PropsAlertDialog {
    todo: Todo,
    minutesCompare: number,
    onChangeRefresh: Function
}
