import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import AlertDialog from './AlertDialog';
import { PropsDataTodoListRow } from '../model/type/todo';
import { Todo } from '../model/type/todo';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DataTodoListRow(props: PropsDataTodoListRow) {
    const period = Math.floor((Date.parse(props.todo.deadline) - (new Date()).getTime()) / 60000); //khởi tạo khoảng thời gian sát deadline
    const [minutesCompare, setMinutesCompare] = useState(period);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCompletedChange = (e: any) => {
        const status = e.target.checked;
        const todo: Todo = props.todo;
        fetch('http://localhost:3001/todoList?id=' + todo.id, {
            method: 'PUT',
            body: JSON.stringify({
                completed: status
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const todoList: Todo[] = props.todoList;
                const index = todoList.findIndex(element => element.id == todo.id);
                todoList[index].completed = status;
                //copy sang mot array moi khong lien quan gi den array cu (tuc khac dia chi) de khi setState React nhan ra thay doi va render DOM
                const todoListChange: Todo[] = todoList.slice();
                props.onDataChange(todoListChange);
            });
    };

    useEffect(() => {
        let loopCheck = setInterval(() => {
            const periodUpdate = Math.floor((Date.parse(props.todo.deadline) - (new Date()).getTime()) / 60000); //update time sát deadline
            setMinutesCompare(periodUpdate);
        }, 1000);
        return () => {
            clearInterval(loopCheck);
        };
    });
    const todoName = props.todo.todoName;
    console.log("minutesCompare", minutesCompare);

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Todo Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Todo Name: </label>
                    <p>{props.todo.todoName}</p>
                    <label>Type: </label>
                    <p>{props.todo.type}</p>
                    <label>Deadline: </label>
                    <p>{props.todo.deadline}</p>
                    <label>Status: </label>
                    <p>{props.todo.completed === true ? "Completed" : "Incomplete"}</p>
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
                        <input type="checkbox" id={todoName} name="todoName" checked={props.todo.completed} onChange={handleCompletedChange} />
                        <label htmlFor={todoName}></label>
                    </div>
                </div>
                {props.todo.completed ? <div className="col-8 completed" onClick={handleShow}><span>{todoName}</span></div>
                    : <div className="col-8" onClick={handleShow}><span>{todoName}</span></div>}
                {/* {minutesCompare <= 1 ? <img src="./Alarm_Clock.gif" className="alert-deadline" /> : ""} */}
                <AlertDialog todo={props.todo} todoList={props.todoList} onDataChange={props.onDataChange} minutesCompare={minutesCompare} />
            </li>
        </>
    );
}
export default DataTodoListRow;