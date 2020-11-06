import { Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#091e4214'
        }
    },
    textArea: {
        minWidth: '300px',
        maxWidth: '400px',
    }
}));

const DialogBox = ({ show, setShow, title, handleDeleteCard }) => {
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

    return (
        <div>
            <Dialog
                open={show}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Options</DialogTitle>
                <DialogContent>
                    <TextField className={classes.textArea} fullWidth multiline value={newTitle} onChange={handleOnChange} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleDeleteCard}>Delete</Button>
                    <Button disabled={!changed} color="primary" onClick={handleClose}>Save</Button>
                    <Button color="default" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Card = ({ card, index }) => {
    const classes = useStyle();
    const [show, setShow] = useState(false);

    const handleCardClick = () => {
        setShow(true);
    }

    const handleDeleteCard = () => {
        console.log(card.id);
        setShow(false);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper onClick={handleCardClick} className={classes.card}>
                            {card.title}
                        </Paper>
                        <DialogBox show={show} setShow={setShow} title={card.title} handleDeleteCard={handleDeleteCard} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
