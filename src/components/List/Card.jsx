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
import ReactMarkdown from 'react-markdown';
import DescriptionIcon from '@material-ui/icons/Description';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#fafafab5'
        }
    },
    textArea: {
        minWidth: '500px',
        maxWidth: '600px',
        marginTop: theme.spacing(1),
    },
    explainTitle: {
        marginTop: theme.spacing(2),
        borderBottom: '1px solid #ddd',
        paddingBottom: theme.spacing(2),
    },
    explainText: {
        fontSize: '14px',
    },
    subtitle: {
        fontSize: '11px',
    },
    editDes: {
        textDecoration: 'underline',
        color: '#727272',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    btn: {
        cursor: 'pointer',
    },
    active: {
        cursor: 'pointer',
        fontWeight: 600,
        padding: theme.spacing(0.5, 1, 0.5, 1),
    }
}));

const DialogBox = ({ show, setShow, title, description, handleDeleteCard, listTitle, handleUpdateCardTitle }) => {
    const classes = useStyle();
    const [newTitle, setNewTitle] = useState(title);
    const [newDes, setNewDes] = useState(description);
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setShow(false);
        setChanged(false);
    };

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
        setChanged(true);
    }

    const handleOnChangeDes = (e) => {
        setNewDes(e.target.value);
        setChanged(true);
    }

    const updateCardTitle = () => {
        handleClose();
        handleUpdateCardTitle(newTitle, newDes);
    }

    const onFocus = (e) => {
        var temp_val = e.target.value;
        e.target.value = '';
        e.target.value = temp_val;
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

                    <Typography className={classes.explainTitle}>
                        説明&nbsp;&nbsp;
                        <span className={open ? classes.active : classes.btn} onClick={() => setOpen(true)}>編集</span>
                        &nbsp;&nbsp;
                        <span className={!open ? classes.active : classes.btn} onClick={() => setOpen(false)}>プレビュー</span>
                    </Typography>
                    {open ? (
                        <div>
                            <TextField
                                fullWidth
                                multiline
                                autoFocus
                                onFocus={onFocus}
                                className={classes.explainText}
                                onChange={handleOnChangeDes}
                                value={newDes}
                                placeholder="詳しい説明を追加してください" />
                            <span className={classes.subtitle}>マークダウン入力可能</span>
                        </div>
                    ) : (
                            <div>
                                <ReactMarkdown
                                    source={newDes}
                                    renderers={{
                                        code: Component
                                    }} />
                            </div>
                        )}

                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={handleClose}>キャンセル</Button>
                    <Button color="secondary" onClick={handleDeleteCard}>削除</Button>
                    <Button disabled={!changed} color="primary" onClick={updateCardTitle}>更新</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Component = ({ value, language }) => {
    return (
        <SyntaxHighlighter language={language ?? null} style={docco}>
            {value ?? ''}
        </SyntaxHighlighter>
    );
};

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

    const handleUpdateCardTitle = (newTitle, newDes) => {
        updateCardTitle(listId, card.id, newTitle, newDes);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper onClick={handleCardClick} className={classes.card}>
                            {card.title}
                            {card.description.length !== 0 ?
                                <div>
                                    <DescriptionIcon style={{
                                        fontSize: '1.2rem',
                                        color: '#959595',
                                    }} />
                                </div>
                                : ''}
                        </Paper>
                        <DialogBox show={show} setShow={setShow} title={card.title} description={card.description} handleDeleteCard={handleDeleteCard} listTitle={listTitle} handleUpdateCardTitle={handleUpdateCardTitle} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
