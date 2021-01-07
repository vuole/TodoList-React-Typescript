import '../App.css';
import React, { useState, useEffect } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PropsModalAddTodo, Todo, TypeTodo, TodoAdd, ErrorFormTodo } from '../model/type/todo';
import { postTodo, getListTypeTodo } from '../service/todo-service'

function ModalAddTodo(props: PropsModalAddTodo) {
    const [show, setShow] = useState(false);
    const [fields, setFields] = useState<TodoAdd>({} as TodoAdd);
    const [errors, setErrors] = useState<ErrorFormTodo>({} as ErrorFormTodo);
    const [listTypeTodo, setListType] = useState<TypeTodo[]>([]);
    const rows: JSX.Element[] = [];

    useEffect(() => {
        getListTypeTodo().then(res => setListType(res.data))
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setFields({} as TodoAdd);
        setErrors({} as ErrorFormTodo);
        setShow(true);
    };

    const handleValidation = () => {
        let pushErrors: ErrorFormTodo = {} as ErrorFormTodo;
        let formIsValid = true;

        if (fields["todoName"] == undefined) {
            pushErrors["todoName"] = "";
            formIsValid = false;
        } else if (fields["todoName"].length === 0) {
            pushErrors["todoName"] = "Todo name is required";
            formIsValid = false;
        }
        if (fields["type"] == undefined) {
            pushErrors["type"] = "";
            formIsValid = false;
        } else if (fields["type"].length === 0) {
            pushErrors["type"] = "Type is required";
            formIsValid = false;
        };
        if (fields["deadline"] == undefined) {
            pushErrors["deadline"] = "";
            formIsValid = false;
        } else if (fields["deadline"].length === 0) {
            pushErrors["deadline"] = "Deadline is required";
            formIsValid = false;
        } else if (Date.parse(fields["deadline"]) < (new Date()).getTime()) {
            let d = new Date();
            pushErrors["deadline"] = "Cannot choose a time in the past";
            formIsValid = false;
        };
        pushErrors["formIsValid"] = formIsValid;
        setErrors(pushErrors);
    };

    const handleChangeInput = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        if (target) {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name: string = target.name;
            // fields[name] = value;

            if (name === "todoName") {
                fields["todoName"] = value as string;
            } else if (name === "type") {
                fields["type"] = value as string;
            } else if (name === "deadline") {
                fields["deadline"] = value as string;
            }
            setFields(fields);
            handleValidation();
        }
    };

    const saveAddTodo = () => {
        postTodo(fields).then(res => {
            props.onChangeRefresh();
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className='fas fa-plus'></i>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                {/* <Modal.Header closeButton> */}
                <Modal.Header>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Todo Name</label>
                        <input type="text" placeholder="Name..." className="form-control" name="todoName" defaultValue={fields["todoName"] || ''}
                            onChange={handleChangeInput} onBlur={handleChangeInput} />
                        <small>{errors["todoName"] || ''}</small>
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control" name="type" defaultValue={fields["type"] || ''}
                            onChange={handleChangeInput} onBlur={handleChangeInput}>
                            <option value="" disabled>Open this select menu</option>
                            {listTypeTodo.forEach((type: any) => {
                                rows.push(<option value={type.key} key={type.key}>{type.value}</option>)
                            })}
                            {rows}
                        </select>
                        <small>{errors["type"] || ''}</small>
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input className="form-control" type="datetime-local" name="deadline" defaultValue={fields["deadline"] || ''}
                            onChange={handleChangeInput} onBlur={handleChangeInput} />
                        <small>{errors["deadline"] || ''}</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button variant="primary" disabled={(errors["formIsValid"] || false) === false ? true : false} onClick={() => { handleClose(); saveAddTodo(); }}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddTodo;