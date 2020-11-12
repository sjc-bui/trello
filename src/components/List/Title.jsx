import React from 'react';
import { InputBase, Typography } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import storeApi from '../../utils/storeApi';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const useStyle = makeStyles((theme) => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: '14px',
        fontWeight: 600,
    },
    editableContainer: {
        display: "flex",
        margin: theme.spacing(1)
    },
    input: {
        fontSize: '14px',
        fontWeight: 600,
        margin: theme.spacing(1),
        '&:focus': {
            backgroundColor: '#ddd',
            boder: 'none',
            boxShadow: 'box-shadow:inset 0 0 0 2px #0079bf'
        }
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

const Title = ({ title, listId }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const { updateListTitle, deleteList } = useContext(storeApi);
    const classes = useStyle();

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
    }

    const handleOnBlur = () => {
        updateTitle();
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.keyCode === 27) {
            updateTitle();
            e.preventDefault();
        }
    }

    const updateTitle = () => {
        setOpen(!open);
        updateListTitle(listId, newTitle.trim());
    }

    const optionClick = () => {
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
                        onChange={handleOnChange} />
                </div>
            ) : (
                    <div className={classes.editableContainer}>
                        <Typography
                            variant="h6"
                            className={classes.editableTitle}
                            onClick={() => setOpen(!open)}>{newTitle}</Typography>
                        <CloseIcon className={classes.optionBtn} onClick={optionClick} />
                        <DeleteConfirmDialog show={show} setShow={setShow} deleteList={deleteList} listId={listId}/>
                    </div>
                )}
        </div>
    )
}

export default Title;
