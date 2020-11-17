import React from 'react';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useState } from 'react';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';
import { isNullOrWhiteSpaces } from '../../utils/helper';
import { withNamespaces } from 'react-i18next';
import * as defaultVal from '../../consts/defaultVal';

const useStyle = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(0, 1, 1, 1),
    },
    input: {
        margin: theme.spacing(0.5, 1, 0.5, 1),
        fontSize: '14px',
        maxHeight: '200px',
        overflowY: 'hidden scroll !important'
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
        padding: '6px 12px',
        textTransform: 'none',
        '&:hover': {
            background: fade('#5aac44', 0.65)
        },
    },
    clearBtn: {
        '&:hover': {
            background: 'none',
        },
    }
}));

const InputCard = (props) => {

    const classes = useStyle();
    const { addMoreCard, addMoreList } = useContext(storeApi);
    const [title, setTitle] = useState(null);

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const addTitle = () => {
        if (isNullOrWhiteSpaces(title)) return;

        if (props.type === 'card') {
            if (title.length > defaultVal.card_title_len) return;
            addMoreCard(title.trim(), props.listId);
        }
        else {
            if (title.length > defaultVal.list_title_len) return;
            addMoreList(title.trim());
        }

        setTitle('');
    }

    const handleConfirmBtn = () => {
        addTitle();
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode === defaultVal.ENTER_KEY) {
            addTitle();
            e.preventDefault();
        } else if (e.keyCode === defaultVal.ESC_KEY) {
            props.setOpen(false);
        }
    }

    const handleCloseBtn = () => {
        props.setOpen(false);
        setTitle('');
    }

    return (
        <div>
            <div>
                <Paper className={classes.card} style={{
                    width: props.type === 'list' ? '283px' : 'auto',
                }}>
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
                            props.type === 'card'
                                ? props.t('inputCardPlace')
                                : props.t('inputListPlace')
                        } />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button
                    onClick={handleConfirmBtn}
                    className={classes.confirmBtn}>
                    {props.type === 'card' ?
                        <span>{props.t('addCardBtn')}</span> :
                        <span>{props.t('addListBtn')}</span>}
                </Button>
                <IconButton
                    onClick={handleCloseBtn}
                    className={classes.clearBtn}>
                    <ClearOutlinedIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default withNamespaces()(InputCard);
