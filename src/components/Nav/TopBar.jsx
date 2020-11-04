import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    AppBar: {
        background: 'None'
    },
    title: {
        flexGrow: 1
    },
    changeBackgroundBtn: {
        color: '#fff',
        backgroundColor: '#dadde13b'
    }
}))

const TopBar = ({ setOpenSideMenu }) => {
    const classes = useStyle();

    return (
        <div>
            <AppBar className={classes.AppBar} position="static" elevation={0}>
                <Toolbar>
                    <Typography className={classes.title} variant="h4">Trello Clone</Typography>
                    <Button
                        onClick={() => {
                            setOpenSideMenu(true)
                        }}
                        className={classes.changeBackgroundBtn}>
                        オプション
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TopBar;
