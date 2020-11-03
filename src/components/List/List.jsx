import React from 'react';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import InputContainer from '../Input/InputContainer';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '33.1%',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1)
    }
}))

const List = () => {
    const classes = useStyle();

    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline />
                <Title />
                <Card />
                <Card />
                <Card />
                <Card />
                <InputContainer />
            </Paper>
        </div>
    )
}

export default List;
