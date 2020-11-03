import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import InputContainer from '../Input/InputContainer';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '300px',
        backgroundColor: '#EBECF0',
        opacity: '0.99',
        marginLeft: theme.spacing(1)
    }
}))

const List = ({ list }) => {
    const classes = useStyle();

    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline />
                <Title title={list.title} />
                {list.cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
                <InputContainer type='card' listId={list.id}/>
            </Paper>
        </div>
    )
}

export default List;
