import React from 'react';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useState } from 'react';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(0, 1, 1, 1),
    },
    input: {
        margin: theme.spacing(0.5, 1, 0.5, 1),
        fontSize: '14px',
    },
    confirm: {
        margin: theme.spacing(0.5, 1, 1, 1),
        background: '#EBECF0',
        paddingLeft: theme.spacing(1),
        borderRadius: 6
    },
    confirmBtn: {
        background: '#61bd4f',
        color: '#fff',
        '&:hover': {
            background: fade('#5aac44', 0.65)
        },
        marginRight: theme.spacing(1)
    }
}));

function empty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case typeof (e) == "undefined":
            return true;
        default:
            return false;
    }
}

const InputCard = ({ setOpen, listId, type }) => {

    const classes = useStyle();
    const { addMoreCard, addMoreList } = useContext(storeApi);
    const [title, setTitle] = useState(null);

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const addTitle = () => {
        if (empty(title)) return;

        if (type === 'card') {
            addMoreCard(title, listId);
        }
        else {
            addMoreList(title);
        }

        setTitle('');
    }

    const handleConfirmBtn = () => {
        addTitle();
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            addTitle();
            e.preventDefault();
        } else if (e.keyCode === 27) {
            setOpen(false);
        }
    }

    const handleCloseBtn = () => {
        setOpen(false);
        setTitle('');
    }

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        multiline
                        autoFocus
                        fullWidth
                        inputProps={{
                            className: classes.input
                        }}
                        value={title || ''}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        placeholder={
                            type === 'card'
                                ? 'このカードにタイトルを入力...'
                                : 'リストのタイトルを入力...'
                        } />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button
                    onClick={handleConfirmBtn}
                    className={classes.confirmBtn}>
                    {type === 'card' ? 'カードを追加' : 'リストを追加'}
                </Button>
                <IconButton
                    onClick={handleCloseBtn}
                    style={{
                        color: "gray"
                    }}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default InputCard;
