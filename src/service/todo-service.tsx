import axios from 'axios';
import { Todo, TodoIsCompleted } from '../model/type/todo';

const baseURL = 'http://localhost:3001/';

export const getListTypeTodo = async () => {
    let result = await axios.get(baseURL + 'getlistTypeTodo');
    return result.data;
};

export const getTodoList = async () => {
    let result = await axios.get(baseURL + 'todoList');
    return result.data;
};

export const postTodo = async (todo: Todo) => {
    let result = await axios.post(baseURL + 'todoList', todo);
    return result.data;
}

export const putIsCompletedTodo = async (id: number, todo: TodoIsCompleted) => {
    let result = await axios.put(baseURL + 'todoList?id=' + id, todo);
    return result.data;
}

export const delTodo = async (id: number) => {
    let result = await axios.delete(baseURL + 'todoList?id=' + id)
    return result.data;
}

