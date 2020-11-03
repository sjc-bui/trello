import React from 'react';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core';
import InputCard from './InputCard';
import { useState } from 'react';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2)
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

const InputContainer = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper onClick={() => {setOpen(!open)}} className={classes.addCard} elevation={0}>
                    <Typography>+ Add a card</Typography>
                </Paper>
            </Collapse>
        </div>
    )
}

export default InputContainer;
