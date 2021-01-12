import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import AlertDialog from './AlertDialog';
import { PropsDataTodoListRow, Todo, TodoIsCompleted } from '../model/type/todo';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import 'moment-timezone';
import { putIsCompletedTodo } from '../service/todo-service';

function DataTodoListRow(props: PropsDataTodoListRow) {
    const period = Math.floor((Date.parse(props.todo.deadline) - (new Date()).getTime()) / 60000); //khởi tạo khoảng thời gian sát deadline
    const [minutesCompare, setMinutesCompare] = useState<number>(period);
    const [show, setShow] = useState(false);

    useEffect(() => {
        let loopCheck = setInterval(() => {
            const periodUpdate = Math.floor((Date.parse(props.todo.deadline) - (new Date()).getTime()) / 60000); //update khoảng time sát deadline
            setMinutesCompare(periodUpdate);
        }, 1000);
        return () => {
            clearInterval(loopCheck);
        };
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const todo: Todo = props.todo;

    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked;
        const body: TodoIsCompleted = { isCompleted: status };
        putIsCompletedTodo(todo.id, body).then(res => {
            props.onChangeRefresh();
        });
    };

    const days = Math.floor(minutesCompare / 1440);
    const timeRemaining = days + ' day(s), ' +
        Math.floor((minutesCompare - (days * 1440)) / 60) + ' hour(s), ' +
        Math.round(minutesCompare % 60) + ' minute(s)'
    // console.log("minutesCompare", minutesCompare);

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Todo Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{todo.id}</p>
                    <label>Todo Name: </label>
                    <p>{todo.todoName}</p>
                    <label>Type: </label>
                    <p>{todo.type}</p>
                    <label>Deadline: </label>
                    <p>
                        {moment(todo.deadline).format('DD/MM/YYYY hh:mm A')}
                    </p>
                    <label>Time remaining: </label>
                    <p>
                        {minutesCompare > 0 ? timeRemaining : "Time Out"}
                    </p>
                    <label>Status: </label>
                    <p>{todo.isCompleted === true ? "Completed" : "Active"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <li className="row">
                <div className="col-2">
                    <div className="round">
                        <input type="checkbox" id={todo.id.toString()} name="todoName" checked={todo.isCompleted} onChange={handleCompletedChange} />
                        <label htmlFor={todo.id.toString()}></label>
                    </div>
                </div>
                <div className={props.todo.isCompleted ? "col-8 completed" : "col-8"} onClick={handleShow}><span>{todo.todoName}</span></div>
                <AlertDialog todo={props.todo} minutesCompare={minutesCompare} onChangeRefresh={props.onChangeRefresh} />
            </li>
        </>
    );
}
export default DataTodoListRow;