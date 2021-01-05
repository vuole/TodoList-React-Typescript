import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropsAlertDialog } from '../model/type/todo';
import { Todo } from '../model/type/todo';

export default function AlertDialog(props: PropsAlertDialog) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTodo = () => {
        const todo: Todo = props.todo;
        fetch('http://localhost:3001/todoList?id=' + todo.id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((result) => {
                const todoList: Todo[] = props.todoList;
                const index = todoList.findIndex(e => e.id === todo.id);
                todoList.splice(index, 1);
                //copy sang mot array moi khong lien quan gi den array cu (tuc khac dia chi) de khi setState React nhan ra thay doi va render DOM
                const todoListChange = todoList.slice();
                props.onDataChange(todoListChange);
            },
                (error) => {
                    console.log("error: ", error);
                });
    };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
            <div className="col-2 delete">
                {props.minutesCompare <= 1 ? <img src="./Alarm_Clock.gif" className="alert-deadline" /> : ""}
                <i className='fas fa-trash-alt' onClick={handleClickOpen}></i>
            </div>
            {/* </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to remove Item?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => { handleClose(); deleteTodo(); }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}