import { Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';
import Divider from '@material-ui/core/Divider';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#fafafab5'
        }
    },
    textArea: {
        minWidth: '300px',
        maxWidth: '400px',
        marginTop: theme.spacing(1),
    }
}));

const DialogBox = ({ show, setShow, title, handleDeleteCard, listTitle, handleUpdateCardTitle }) => {
    const classes = useStyle();
    const [newTitle, setNewTitle] = useState(title)
    const [changed, setChanged] = useState(false);

    const handleClose = () => {
        setShow(false);
        setChanged(false);
    };

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
        setChanged(true);
    }

    const updateCardTitle = () => {
        handleClose();
        handleUpdateCardTitle(newTitle);
    }

    return (
        <div>
            <Dialog
                open={show}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <Typography>リスト: {listTitle}</Typography>
                    <Divider />
                    <TextField className={classes.textArea} fullWidth multiline value={newTitle} onChange={handleOnChange} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleDeleteCard}>削除</Button>
                    <Button disabled={!changed} color="primary" onClick={updateCardTitle}>更新</Button>
                    <Button color="default" onClick={handleClose}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Card = ({ card, index, listId, listTitle }) => {
    const classes = useStyle();
    const [show, setShow] = useState(false);
    const { updateCardTitle, deleteCard } = useContext(storeApi);

    const handleCardClick = () => {
        setShow(true);
    }

    const handleDeleteCard = () => {
        deleteCard(listId, card.id);
        setShow(false);
    }

    const handleUpdateCardTitle = (newTitle) => {
        updateCardTitle(listId, card.id, newTitle);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper onClick={handleCardClick} className={classes.card}>
                            {card.title}
                        </Paper>
                        <DialogBox show={show} setShow={setShow} title={card.title} handleDeleteCard={handleDeleteCard} listTitle={listTitle} handleUpdateCardTitle={handleUpdateCardTitle}/>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
