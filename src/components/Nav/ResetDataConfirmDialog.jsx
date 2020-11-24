import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
    btn: {
        textTransform: 'none',
        padding: '6px 12px',
    }
}));

const ResetDataConfirmDialog = (props) =>
{
    const classes = useStyle();

    const handleClose = () =>
    {
        props.setShow(false);
    };

    const handleDelete = () =>
    {
        props.resetData();
        props.setShow(false);
    }

    return (
        <Dialog
            open={props.show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.t('resetDialogTitle')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.t('resetDialogContent')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.btn} onClick={handleClose} color="default">{props.t('cancelBtn')}</Button>
                <Button className={classes.btn} onClick={handleDelete} color="secondary">{props.t('resetBtn')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default withNamespaces()(ResetDataConfirmDialog);
