import { InputBase, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: '1rem',
    },
    editableContainer: {
        display: "flex",
        margin: theme.spacing(1)
    },
    input: {
        fontSize: '1rem',
        margin: theme.spacing(1),
        '&:focus': {
            backgroundColor: '#ddd'
        }
    }
}))

const Title = ({ title, listId }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [open, setOpen] = useState(false);
    const { updateListTitle } = useContext(storeApi);
    const classes = useStyle();

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
    }

    const handleOnBlur = () => {
        setOpen(!open);
        updateListTitle(listId, newTitle);
    }

    return (
        <div>
            {open ? (
                <div>
                    <InputBase
                        value={newTitle}
                        inputProps={{
                            className: classes.input
                        }}
                        fullWidth
                        autoFocus
                        onBlur={handleOnBlur}
                        onChange={handleOnChange} />
                </div>
            ) : (
                    <div className={classes.editableContainer}>
                        <Typography
                            variant="h6"
                            className={classes.editableTitle}
                            onClick={() => setOpen(!open)}>{newTitle}</Typography>
                        <MoreHorizIcon />
                    </div>
                )}
        </div>
    )
}

export default Title;
