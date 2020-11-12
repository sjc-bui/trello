import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import { withNamespaces } from 'react-i18next';

const useStyle = makeStyles(() => ({
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
    }
}))

const TopBar = ({ setOpenSideMenu, t }) => {
    const classes = useStyle();

    return (
        <div>
            <AppBar className={classes.AppBar} position="static" elevation={0}>
                <Toolbar>
                    <div className={classes.title}>
                        <Typography variant="h6">
                            {t('dashboard')}
                        </Typography>
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
