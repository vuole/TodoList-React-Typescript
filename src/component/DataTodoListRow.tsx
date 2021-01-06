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
            const periodUpdate = Math.floor((Date.parse(props.todo.deadline) - (new Date()).getTime()) / 60000); //update khoảng sát deadline
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

    const todoName = todo.todoName;
    // console.log("minutesCompare", minutesCompare);

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Todo Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Todo Name: </label>
                    <p>{todo.todoName}</p>
                    <label>Type: </label>
                    <p>{todo.type}</p>
                    <label>Deadline: </label>
                    <p>
                        {moment(todo.deadline).format('DD/MM/YYYY, hh:mm a')}
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
                        <input type="checkbox" id={todoName} name="todoName" checked={props.todo.isCompleted} onChange={handleCompletedChange} />
                        <label htmlFor={todoName}></label>
                    </div>
                </div>
                {props.todo.isCompleted ? <div className="col-8 completed" onClick={handleShow}><span>{todoName}</span></div>
                    : <div className="col-8" onClick={handleShow}><span>{todoName}</span></div>}
                <AlertDialog todo={props.todo} minutesCompare={minutesCompare} onChangeRefresh={props.onChangeRefresh} />
            </li>
        </>
    );
}
export default DataTodoListRow;