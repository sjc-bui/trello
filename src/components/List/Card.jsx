import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';
import DescriptionIcon from '@material-ui/icons/Description';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CardOptionDialog from './CardOptionDialog';
import { withNamespaces } from 'react-i18next';
import DueDate from './DueDate';
import CardTitle from './CardTitle';

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
    statusWrap: {
        display: 'flex',
        color: '#5e6c84',
        marginTop: '3px',
    },
    dueDateText: {
        fontSize: '13px',
        backgroundColor: '#bbeffd',
        padding: '3px 6px 1px',
        borderRadius: '3px',
    }
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

    const handleUpdateCardTitle = (newTitle, newDes, follow, label, dueDate, dueDateComplete) => {
        updateCardTitle(props.listId, props.card.id, newTitle, newDes, follow, label, dueDate, dueDateComplete);
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

                            <CardTitle title={props.card.title} />

                            <div className={classes.statusWrap}>
                                {props.card.description.length !== 0 ?
                                    <DescriptionIcon className={classes.customIcon} />
                                    : ''}
                                {props.card.follow ?
                                    <VisibilityOutlinedIcon className={classes.customIcon} />
                                    : ''}
                                {props.card.due_date.length !== 0 ?
                                    <DueDate card={props.card} lang={props.lang} formatType={props.formatType} />
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

export default withNamespaces()(Card);
