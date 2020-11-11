import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteConfirmDialog = (props) => {

    const handleClose = () => {
        props.setShow(false);
    };

    const handleDeleteList = () => {
        props.deleteList(props.listId);
        props.setShow(false);
    }

    return (
        <Dialog
            open={props.show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"このリストを削除しますか?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="default">キャンセル</Button>
                <Button onClick={handleDeleteList} color="secondary">削除</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmDialog;
