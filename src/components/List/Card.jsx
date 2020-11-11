import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';
import DescriptionIcon from '@material-ui/icons/Description';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardOptionDialog from './CardOptionDialog';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#fafafab5',
        }
    },
    customIcon: {
        fontSize: '1.2rem',
        color: '#959595',
        marginRight: '4px',
    },
}));

const Card = (props) => {
    const classes = useStyle();
    const [show, setShow] = useState(false);
    const { updateCardTitle, deleteCard } = useContext(storeApi);

    const handleCardClick = () => {
        setShow(true);
    }

    const handleDeleteCard = () => {
        deleteCard(props.listId, props.card.id);
        setShow(false);
    }

    const handleUpdateCardTitle = (newTitle, newDes, follow, label) => {
        updateCardTitle(props.listId, props.card.id, newTitle, newDes, follow, label);
    }

    return (
        <Draggable draggableId={props.card.id} index={props.index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        <Paper
                            onClick={handleCardClick}
                            className={classes.card}
                            style={{
                                borderLeft: `4px solid ${props.card.label}`,
                                borderTopLeftRadius: props.card.label !== '#ffffff00' ? '0px' : '4px',
                                borderBottomLeftRadius: props.card.label !== '#ffffff00' ? '0px' : '4px',
                            }}>
                            {props.card.title}
                            <div>
                                {props.card.description.length !== 0 ?
                                    <DescriptionIcon className={classes.customIcon} />
                                    : ''}
                                {props.card.follow ?
                                    <VisibilityIcon className={classes.customIcon} />
                                    : ''}
                            </div>
                        </Paper>
                        <CardOptionDialog show={show} setShow={setShow} card={props.card} handleDeleteCard={handleDeleteCard} listTitle={props.listTitle} handleUpdateCardTitle={handleUpdateCardTitle} />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;
