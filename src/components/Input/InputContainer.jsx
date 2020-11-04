import React from 'react';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core';
import InputCard from './InputCard';
import { useState } from 'react';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '295px',
        marginTop: theme.spacing(1)
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: '#EBECF0',
        '&:hover': {
            backgroundColor: fade('#000', 0.25)
        }
    }
}));

const InputContainer = ({ listId, type }) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard type={type} setOpen={setOpen} listId={listId} />
            </Collapse>
            <Collapse in={!open}>
                <Paper onClick={() => { setOpen(!open) }} className={classes.addCard} elevation={0}>
                    <Typography>
                    + {type === 'card' ? 'Add a card' : 'Add list'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}

export default InputContainer;
