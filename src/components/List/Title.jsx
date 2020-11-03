import { InputBase, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyle = makeStyles((theme) => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
    editableContainer: {
        display: "flex",
        margin: theme.spacing(1)
    },
    input: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: theme.spacing(1),
        '&:focus': {
            backgroundColor: '#ddd'
        }
    }
}))

const Title = () => {

    const [open, setOpen] = useState(false);
    const classes = useStyle();

    return (
        <div>
            {open ? (
                <div>
                    <InputBase value="Todo" inputProps={{
                        className: classes.input
                    }} fullWidth onBlur={() => setOpen(!open)} />
                </div>
            ) : (
                    <div className={classes.editableContainer}>
                        <Typography
                            className={classes.editableTitle}
                            onClick={() => setOpen(!open)}>Todo</Typography>
                        <MoreHorizIcon />
                    </div>
                )}
        </div>
    )
}

export default Title;
