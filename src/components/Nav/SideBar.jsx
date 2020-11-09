import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Grow, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core';
import colors from '../../utils/color';
import images from '../../utils/images';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        cursor: 'pointer',
    },
    optionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: theme.spacing(2),
    },
    selectForm: {
        margin: theme.spacing(1, 1, 1, 1)
    },
    formControl: {
        minWidth: 150
    },
    resetBtn: {
        marginTop: theme.spacing(3)
    },
    menuTitle: {
        textAlign: 'center',
    }
}))

const ConfirmBox = ({ show, setShow, resetData }) => {

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = () => {
        resetData();
        setShow(false);
    }

    return (
        <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"全てのデータをリセットしますか?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    既存のデータは削除され、この操作は元に戻せません！
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">キャンセル</Button>
                <Button onClick={handleDelete} color="secondary" autoFocus>リセット</Button>
            </DialogActions>
        </Dialog>
    );
}

const SideBar = ({ openSideMenu, setOpenSideMenu, changeBackground, resetData }) => {
    const classes = useStyle();
    const [openColorOptions, setOpenColorOptions] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <div>
            <Drawer
                anchor="right"
                open={openSideMenu}
                onClose={() => {
                    setOpenSideMenu(false);
                }}>
                <div className={classes.selectForm}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>言語</InputLabel>
                        <Select>
                            <MenuItem selected="true">英語</MenuItem>
                            <MenuItem>ベトナム語</MenuItem>
                            <MenuItem>日本語</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.resetBtn}>
                        <Button onClick={() => setShow(true)}>データリセット</Button>
                        <ConfirmBox show={show} setShow={setShow} resetData={resetData} />
                    </div>
                </div>
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
                    <Typography className={classes.menuTitle}>
                        {openColorOptions ? '色' : '写真'}
                    </Typography>
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
                                            onClick={() => changeBackground(index)}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow> :
                        <Grow in={true}>
                            <div className={classes.optionContainer}>
                                {images.map((image, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.box}
                                            style={{
                                                backgroundImage: `url(${image})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                            }}
                                            onClick={() => changeBackground(image)}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default SideBar;
