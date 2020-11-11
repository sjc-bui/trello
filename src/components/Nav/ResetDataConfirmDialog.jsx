import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ResetDataConfirmDialog = (props) => {

    const handleClose = () => {
        props.setShow(false);
    };

    const handleDelete = () => {
        props.resetData();
        props.setShow(false);
    }

    return (
        <Dialog
            open={props.show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"全てのデータをリセットしますか?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    既存のデータは削除され、この操作は元に戻せません！
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">キャンセル</Button>
                <Button onClick={handleDelete} color="secondary">リセット</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResetDataConfirmDialog;
