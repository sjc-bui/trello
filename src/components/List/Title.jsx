import React from 'react';
import { InputBase, Typography } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import storeApi from '../../utils/storeApi';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import * as defaultVal from '../../consts/defaultVal';

const useStyle = makeStyles((theme) => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: '14px',
        fontWeight: 600,
        padding: '4px 4px',
    },
    editableContainer: {
        display: "flex",
        margin: theme.spacing(1)
    },
    input: {
        fontSize: '14px',
        fontWeight: 600,
        margin: theme.spacing(1),
        boxShadow: 'inset 0 0 0 2px #0079bf',
        borderRadius: '4px',
        backgroundColor: '#fff',
        paddingLeft: '4px',
    },
    optionBtn: {
        borderRadius: 2,
        fontSize: '1.3rem',
        color: '#a4a4a4',
        '&:hover': {
            cursor: 'pointer',
            color: '#b20000',
        }
    }
}))

const Title = ({ title, listId }) =>
{
    const [newTitle, setNewTitle] = useState(title);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);
    const { updateListTitle, deleteList } = useContext(storeApi);
    const classes = useStyle();

    const onFocus = (e) =>
    {
        e.target.select();
    }

    const handleOnChange = (e) =>
    {
        setNewTitle(e.target.value);
        setChanged(true);
    }

    const handleOnBlur = () =>
    {
        updateTitle();
    }

    const handleKeyPress = (e) =>
    {
        if (e.keyCode === defaultVal.ENTER_KEY || e.keyCode === defaultVal.ESC_KEY)
        {
            updateTitle();
            e.preventDefault();
        }
    }

    const updateTitle = () =>
    {
        if (changed)
        {
            const cardTitle = newTitle.trim();
            if (cardTitle.length > 100) return;

            setChanged(false);
            updateListTitle(listId, cardTitle);
        }

        setOpen(!open);
    }

    const optionClick = () =>
    {
        setShow(true);
    }

    return (
        <div style={{
            paddingTop: '1px'
        }}>
            {open ? (
                <div>
                    <InputBase
                        value={newTitle}
                        inputProps={{
                            className: classes.input
                        }}
                        fullWidth
                        autoFocus
                        onKeyDown={handleKeyPress}
                        onBlur={handleOnBlur}
                        onFocus={onFocus}
                        onChange={handleOnChange} />
                </div>
            ) : (
                    <div className={classes.editableContainer}>
                        <Typography
                            className={classes.editableTitle}
                            onClick={() => setOpen(!open)}>{newTitle}</Typography>
                        <CloseIcon className={classes.optionBtn} onClick={optionClick} />
                        <DeleteConfirmDialog show={show} setShow={setShow} deleteList={deleteList} listId={listId} />
                    </div>
                )}
        </div>
    )
}

export default Title;
