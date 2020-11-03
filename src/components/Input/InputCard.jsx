import React from 'react';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(0.5, 1, 1, 1)
    },
    confirm: {
        margin: theme.spacing(0.5, 1, 1, 1)
    },
    confirmBtn: {
        background: 'green',
        color: '#fff',
        '&:hover': {
            background: fade('#5aac44', 0.75)
        },
        marginRight: theme.spacing(2)
    }
}));

const InputCard = ({ setOpen }) => {
    const classes = useStyle();

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        multiline
                        fullWidth
                        // onBlur={() => setOpen(false)}
                        inputProps={{
                            className: classes.input
                        }}
                        placeholder="Enter the title of this card." />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button
                    onClick={() => setOpen(false)}
                    className={classes.confirmBtn}>Add card</Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default InputCard;
