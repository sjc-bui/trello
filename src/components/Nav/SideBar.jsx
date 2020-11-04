import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Grow } from '@material-ui/core';
import colors from '../../utils/color';

const useStyle = makeStyles((theme) => ({
    drawer: {
        width: '300px'
    },
    menu: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around',
    },
    box: {
        width: '46%',
        height: '90px',
        borderRadius: '9px',
        marginBottom: theme.spacing(2),
    },
    optionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: theme.spacing(2),
    }
}))

const SideBar = ({ openSideMenu, setOpenSideMenu, changeBackground }) => {
    const classes = useStyle();
    const [openColorOptions, setOpenColorOptions] = useState(false);

    return (
        <div>
            <Drawer
                anchor="right"
                open={openSideMenu}
                onClose={() => {
                    setOpenSideMenu(false);
                }}>
                <div className={classes.drawer}>
                    <div className={classes.menu}>
                        <div
                            className={classes.box}
                            style={{
                                backgroundImage: 'url(https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            onClick={() => setOpenColorOptions(false)}>
                        </div>
                        <div
                            className={classes.box}
                            style={{
                                backgroundImage: 'url(https://www.color-hex.com/palettes/7900.png)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            onClick={() => setOpenColorOptions(true)}>
                        </div>
                    </div>
                    {openColorOptions ?
                        <Grow in={true}>
                            <div className={classes.optionContainer}>
                                {colors.map((color, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.box}
                                            style={{
                                                background: color
                                            }}
                                            onClick={() => changeBackground(color)}
                                            >
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow>
                        :
                        <Grow in={true}>
                            <div className={classes.optionContainer}>
                                <div
                                    className={classes.box}
                                    style={{
                                        backgroundImage: 'url(https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                    onClick={() => changeBackground('https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg')}
                                    >
                                </div>
                            </div>
                        </Grow>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default SideBar;
