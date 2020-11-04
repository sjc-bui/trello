import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import InputContainer from '../Input/InputContainer';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1)
    },
    cardContainer: {
        // marginTop: theme.spacing(4)
    }
}))

const List = ({ list, index }) => {
    const classes = useStyle();

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper className={classes.root} {...provided.dragHandleProps}>
                        <CssBaseline />
                        <Title title={list.title} listId={list.id} />
                        <Droppable droppableId={list.id}>
                            {(provided) => (
                                <div className={classes.cardContainer} ref={provided.innerRef} {...provided.droppableProps}>
                                    {list.cards.map((card, index) => (
                                        <Card key={card.id} card={card} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <InputContainer type='card' listId={list.id} />
                    </Paper>
                </div>
            )}
        </Draggable>
    )
}

export default List;
