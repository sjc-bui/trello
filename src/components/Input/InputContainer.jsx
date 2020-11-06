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
        minWidth: '283px',
        '&:hover': {
            backgroundColor: fade('#fff', 0.85),
            cursor: 'pointer'
        },
    },
    title: {
        fontSize: '14px',
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
                    <Typography className={classes.title}>
                    ＋ {type === 'card' ? 'さらにカードを追加' : 'もう1つリストを追加'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}

export default InputContainer;
