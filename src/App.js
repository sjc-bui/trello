import React, { useState } from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { v4 as uuid } from 'uuid';
import InputContainer from './components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Navigation from './components/Nav/Navigation';
import colors from './utils/color';
import Snowfall from 'react-snowfall';
import dateTimeFormat from './utils/datetimeFormat';

import { saveLocalStorage, getLocalStorageData, resetLocalData, defaultLanguage } from './utils/helper';

const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        minHeight: '94vh',
        width: '100%',
        overflowY: 'auto'
    },
}))

const App = () => {

    if (localStorage.getItem('data') == null) {
        saveLocalStorage(store);
    }

    const classes = useStyle();

    try {
        var jsonObj = getLocalStorageData('data');
    } catch (error) {
        resetLocalData();
        saveLocalStorage(store);
        jsonObj = getLocalStorageData('data');
        alert("Error: Something went wrong. Please try again!");
    }

    let backgroundValue = jsonObj.background;
    if (typeof (backgroundValue) === typeof (0)) {
        if ((backgroundValue + 1) > colors.length) {
            backgroundValue = 0;
        }
    }

    const [data, setData] = useState(jsonObj);
    const [defaultBackground, changeBackground] = useState(backgroundValue);
    const [useEffect, setUseEffect] = useState(data.snow_effect.turn_on);
    const [snowFlake, setSnowFlake] = useState(data.snow_effect.snow_flake);

    const defaultLang = defaultLanguage();
    let defaultFormatType = data.datetime_format;
    if ((defaultFormatType + 1) > dateTimeFormat.length ||
        typeof (defaultFormatType) === 'string') {
        defaultFormatType = 0;
    }

    const addMoreCard = (title, listId) => {
        const newCardId = uuid();

        const newCard = {
            id: newCardId,
            title: title,
            description: "",
            follow: false,
            label: '#ffffff00',
            due_date: "",
            due_date_complete: false,
            created_at: Date.now(),
            updated_at: null,
        }

        const currentList = data.lists[listId];
        currentList.cards = [...currentList.cards, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: currentList
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const addMoreList = (title) => {
        const newListId = uuid();

        const newList = {
            id: newListId,
            title,
            cards: [],
            created_at: Date.now(),
            updated_at: null,
        }

        const newState = {
            ...data,
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const updateListTitle = (listId, newTitle) => {
        const list = data.lists[listId];
        list.title = newTitle;
        list.updated_at = Date.now();

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (type === "list") {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);

            const newState = {
                ...data,
                listIds: newListIds
            }

            saveLocalStorage(newState);
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

            saveLocalStorage(newState);
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

            saveLocalStorage(newState);
            setData(newState);
        }
    }

    const updateCardTitle = (listId, cardId, newTitle, newDes, follow, label, dueDate, dueDateComplete) => {
        const cards = data.lists[listId].cards;
        cards.map(card => {
            if (card.id === cardId) {
                card.title = newTitle;
                card.description = newDes;
                card.follow = follow;
                card.label = label;
                card.due_date = dueDate;
                card.due_date_complete = dueDateComplete;
                card.updated_at = Date.now();
            }
            return null;
        });

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: {
                    ...data.lists[listId],
                    cards: cards
                }
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const deleteCard = (listId, cardId) => {
        const lists = data.lists[listId];
        const cardData = lists.cards.filter((card) => card.id !== cardId);

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: {
                    ...data.lists[listId],
                    cards: cardData
                }
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const deleteList = (listId) => {
        const listIds = data.listIds.filter(id => id !== listId);
        const lists = data.lists;
        delete lists[listId];

        const newState = {
            ...data,
            listIds: listIds,
            lists: lists
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const resetData = () => {
        resetLocalData();
        saveLocalStorage(store);
        var jsonObj = getLocalStorageData('data');
        setData(jsonObj);
        changeBackground(jsonObj.background);
        setUseEffect(jsonObj.snow_effect.turn_on);
        setSnowFlake(jsonObj.snow_effect.snow_flake);
    }

    const changeBackgroundColor = (value) => {
        changeBackground(value);

        const newState = {
            ...data,
            background: value
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const changeEffectOnOff = (turn) => {
        const newState = {
            ...data,
            snow_effect: {
                ...data.snow_effect,
                turn_on: turn,
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const changeSnowFlakeCount = (newVal) => {
        const newState = {
            ...data,
            snow_effect: {
                ...data.snow_effect,
                snow_flake: newVal,
            }
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const changeDisplayLanguage = (lang) => {
        const newState = {
            ...data,
            language: lang,
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const changeDateTimeFormatType = (type) => {
        const newState = {
            ...data,
            datetime_format: type,
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    const updateBoardName = (newBoardName) => {
        const newState = {
            ...data,
            board_name: newBoardName,
        }

        saveLocalStorage(newState);
        setData(newState);
    }

    return (
        <div
            style={{
                backgroundColor: colors[defaultBackground],
                backgroundImage: `url(${defaultBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }}>

            <div>
                {useEffect ?
                    <Snowfall snowflakeCount={snowFlake} />
                    : ''}
            </div>

            <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle, updateCardTitle, deleteCard, deleteList, changeDisplayLanguage, changeDateTimeFormatType, updateBoardName }}>
                <Navigation
                    boardName={data.board_name}
                    lang={defaultLang}
                    formatType={defaultFormatType}
                    useEffect={useEffect}
                    setUseEffect={setUseEffect}
                    snowFlake={snowFlake}
                    setSnowFlake={setSnowFlake}
                    changeEffectOnOff={changeEffectOnOff}
                    changeSnowFlakeCount={changeSnowFlakeCount}
                    changeBackground={changeBackgroundColor}
                    resetData={resetData} />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="app" type='list' direction="horizontal">
                        {(provided) => (
                            <div
                                className={classes.root}
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {data.listIds.map((listId, index) => {
                                    const list = data.lists[listId];
                                    return <List lang={defaultLang} formatType={defaultFormatType} list={list} key={listId} index={index} />
                                })}
                                <InputContainer type='list' listLength={data.listIds.length} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </StoreApi.Provider>
        </div>
    )
}

export default App;
