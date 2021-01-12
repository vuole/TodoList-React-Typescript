import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropsAlertDialog } from '../model/type/todo';
import { Todo } from '../model/type/todo';
import { delTodo } from "../service/todo-service"

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
        delTodo(todo.id).then(res => {
            props.onChangeRefresh();
        });
    };

    return (
        <div>
            <div className="col-2 delete">
                {props.minutesCompare <= 0 ? <i className='far fa-calendar-times' data-toggle="tooltip" title="Time Out"></i> : ""}
                {props.minutesCompare <= 15 && props.minutesCompare > 0 ?
                    <img src="../../Alarm_Clock.gif" className="alert-deadline" data-toggle="tooltip" title={props.minutesCompare + ' minutes left before the deadline'} /> : ""}
                <i className='fas fa-trash-alt' data-toggle="tooltip" title="Delete" onClick={handleClickOpen}></i>
            </div>
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