import React from 'react';
import storeApi from '../../utils/storeApi';
import * as defaultVal from '../../consts/defaultVal';
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, InputBase, Toolbar, Typography } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { useState } from 'react';
import { useContext } from 'react';

const useStyle = makeStyles((theme) => ({
    AppBar: {
        background: 'None'
    },
    title: {
        flexGrow: 1,
    },
    changeBackgroundBtn: {
        color: '#fff',
        backgroundColor: '#dadde13b',
        padding: '4px 8px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#dadde166',
        }
    },
    navWrap: {
        backgroundImage: 'linear-gradient(to top, rgba(255,0,0,0), rgb(130 130 130 / 44%))',
        marginBottom: theme.spacing(1),
    }
}))

const TopBar = ({ setOpenSideMenu, t, boardName }) => {

    const classes = useStyle();

    const [openEditTitle, setOpenEditTitle] = useState(false);
    const [boardTitle, setBoardTitle] = useState(boardName);
    const [titleChanged, setTitleChanged] = useState(false);

    const { updateBoardName } = useContext(storeApi);

    const onFocus = (e) => {
        e.target.select();
    }

    const handleChangeBoardName = (boardName) => {
        if (!titleChanged) {
            setOpenEditTitle(false);
            return;
        }

        const board_name = boardName.trim();

        if (board_name.length > 0 && board_name.length <= defaultVal.board_name_len) {
            updateBoardName(board_name);
            setBoardTitle(board_name);
            setOpenEditTitle(false);
            setTitleChanged(false);
        } else {
            setOpenEditTitle(true);
        }
    }

    const handleOnBlur = () => {
        handleChangeBoardName(boardTitle);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === defaultVal.ENTER_KEY || e.keyCode === defaultVal.ESC_KEY) {
            handleChangeBoardName(boardTitle);
        }
    }

    const handleOnChange = (e) => {
        setBoardTitle(e.target.value);
        setTitleChanged(true);
    }

    return (
        <div className={classes.navWrap}>
            <AppBar className={classes.AppBar} position="static" elevation={0}>
                <Toolbar>
                    <div className={classes.title}>
                        {!openEditTitle ?
                            <Typography
                                style={{
                                    fontSize: '18px',
                                    paddingLeft: '6px',
                                    fontWeight: '700',
                                }}>
                                <span onClick={() => setOpenEditTitle(true)}>
                                    {boardTitle.length !== 0 ?
                                        boardTitle
                                        :
                                        t('dashboard')
                                    }
                                </span>
                            </Typography>
                            :
                            <InputBase
                                autoFocus
                                style={{
                                    background: '#ffffff',
                                    color: '#172b4d',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    paddingLeft: '6px',
                                    boxShadow: 'inset 0 0 0 2px #0079bf',
                                    borderRadius: '4px',
                                }}
                                onKeyDown={handleKeyDown}
                                onBlur={handleOnBlur}
                                onFocus={onFocus}
                                value={boardTitle}
                                onChange={handleOnChange} />
                        }
                    </div>
                    <Button
                        onClick={() => {
                            setOpenSideMenu(true)
                        }}
                        className={classes.changeBackgroundBtn}>
                        {t('showMenu')}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withNamespaces()(TopBar);
