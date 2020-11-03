import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1)
    }
}));

const Card = () => {
    const classes = useStyle();

    return (
        <div>
            <Paper className={classes.card}>
                Trello Clone using React JS
            </Paper>
        </div>
    )
}

export default Card;
