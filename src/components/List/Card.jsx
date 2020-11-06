import { Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#091e4214'
        }
    }
}));

const Card = ({ card, index }) => {
    const classes = useStyle();

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper className={classes.card}>
                            {card.title}
                        </Paper>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
