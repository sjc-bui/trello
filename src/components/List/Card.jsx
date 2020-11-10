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
import VisibilityIcon from '@material-ui/icons/Visibility';

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
        paddingBottom: theme.spacing(1),
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
    },
    titleWrap: {
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    newCardTitle: {
        cursor: 'text',
    },
    followFlag: {
        color: '#00b600',
        fontWeight: 600,
        marginLeft: theme.spacing(1),
    },
    customIcon: {
        fontSize: '1.2rem',
        color: '#959595',
        marginRight: '4px',
    },
    followBtn: {
        marginTop: theme.spacing(1),
        backgroundColor: '#091e420a',
        '&:hover': {
            backgroundColor: '#091e4221',
        }
    }
}));

const DialogBox = ({ show, setShow, card, handleDeleteCard, listTitle, handleUpdateCardTitle }) => {
    const classes = useStyle();
    const [newTitle, setNewTitle] = useState(card.title);
    const [newDes, setNewDes] = useState(card.description);
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEditTitle, setOpenEditTitle] = useState(false);
    const [follow, setFollow] = useState(card.follow);

    const handleClose = () => {
        setShow(false);
    };

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
        setChanged(true);
    }

    const handleOnChangeDes = (e) => {
        setNewDes(e.target.value);
        setChanged(true);
    }

    const handleCardFollow = () => {
        setFollow(!follow)
        setChanged(true);
    }

    const updateCardTitle = () => {
        handleClose();
        handleUpdateCardTitle(newTitle, newDes, follow);
        setChanged(false);
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
                    <Typography>リスト：{listTitle}</Typography>
                    <Divider />

                    {openEditTitle ? (
                        <TextField
                            fullWidth
                            multiline
                            autoFocus
                            onFocus={onFocus}
                            onBlur={() => setOpenEditTitle(false)}
                            className={classes.textArea}
                            value={newTitle}
                            onChange={handleOnChange} />
                    ) : (
                            <div className={classes.titleWrap}>
                                <Typography className={classes.newCardTitle} onClick={() => setOpenEditTitle(true)}>{newTitle}</Typography>
                            </div>
                        )}

                    <Typography className={classes.explainTitle}>
                        説明：&nbsp;&nbsp;
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
                    <div>
                        <Button
                            className={classes.followBtn}
                            onClick={handleCardFollow}>
                            <VisibilityIcon className={classes.customIcon} />
                            フォローする
                              {follow ?
                                <span className={classes.followFlag}>✔</span> :
                                ('')}
                        </Button>
                    </div>
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

    const handleUpdateCardTitle = (newTitle, newDes, follow) => {
        updateCardTitle(listId, card.id, newTitle, newDes, follow);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper onClick={handleCardClick} className={classes.card}>
                            {card.title}
                            <div>
                                {card.description.length !== 0 ?
                                    <DescriptionIcon className={classes.customIcon} />
                                    : ''}
                                {card.follow ?
                                    <VisibilityIcon className={classes.customIcon} />
                                    : ''}
                            </div>
                        </Paper>
                        <DialogBox show={show} setShow={setShow} card={card} handleDeleteCard={handleDeleteCard} listTitle={listTitle} handleUpdateCardTitle={handleUpdateCardTitle} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
