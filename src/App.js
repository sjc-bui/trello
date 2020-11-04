import React, { useState } from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { v4 as uuid } from 'uuid';
import InputContainer from './components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#1976d2',
        width: '100%',
        overflowY: 'auto'
    }
}))

function empty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case typeof (e) == "undefined":
            return true;
        default:
            return false;
    }
}

const App = () => {
    const classes = useStyle();
    const [data, setData] = useState(store);

    const addMoreCard = (title, listId) => {
        if (empty(title)) return;

        const newCardId = uuid();

        const newCard = {
            id: newCardId,
            title: title
        }

        const currentList = data.lists[listId];
        currentList.cards = [...currentList.cards, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists, [listId]: currentList
            }
        }

        setData(newState);
    }

    const addMoreList = (title) => {
        const newListId = uuid();

        const newList = {
            id: newListId,
            title,
            cards: []
        }

        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists, [newListId]: newList
            }
        }

        setData(newState);
    }

    const updateListTitle = (listId, newTitle) => {
        const list = data.lists[listId];
        list.title = newTitle;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            }
        }

        setData(newState);
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
        )[0];

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList
                }
            }

            setData(newState);
        } else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList
                }
            }

            setData(newState);
        }
    }

    return (
        <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={classes.root}>
                    {data.listIds.map((listId) => {
                        const list = data.lists[listId];
                        return <List list={list} key={listId} />
                    })}
                    <InputContainer type='list' />
                </div>
            </DragDropContext>
        </StoreApi.Provider>
    )
}

export default App;
