import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
    btn: {
        textTransform: 'none',
        padding: '6px 12px'
    }
}));

const DeleteConfirmDialog = (props) => {

    const classes = useStyle();

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
            <DialogTitle id="alert-dialog-title">{props.t('deleteListTitle')}</DialogTitle>
            <DialogActions>
                <Button className={classes.btn} onClick={handleClose} color="default">{props.t('cancelBtn')}</Button>
                <Button className={classes.btn} onClick={handleDeleteList} color="secondary">{props.t('deleteBtn')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default withNamespaces()(DeleteConfirmDialog);
