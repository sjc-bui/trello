import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Grow, FormControl, InputLabel, Select, MenuItem, Button, Typography, FormGroup } from '@material-ui/core';
import colors from '../../utils/color';
import images from '../../utils/images';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import ResetDataConfirmDialog from './ResetDataConfirmDialog';

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
    },
    btn: {
        margin: theme.spacing(0, 1, 0, 0),
    },
    effectBoxWrap: {
        margin: theme.spacing(0, 1, 0, 1),
    }
}))

const SideBar = (props) => {

    const classes = useStyle();
    const [show, setShow] = useState(false);
    const [openColorOptions, setOpenColorOptions] = useState(false);

    const exportJson = () => {
        const localData = localStorage.getItem('data');
        var jsonObj = JSON.parse(localData);
        var jsonPretty = JSON.stringify(jsonObj, null, 2);

        var x = window.open("", "", "top=500,left=500,width=900,height=500");
        x.document.open();
        x.document.write(`<html><header><title>Json Data</title></header><body><pre>${jsonPretty}</pre></body></html>`);
        x.document.close();
    }

    const handleUseEffect = () => {
        props.setUseEffect(!props.useEffect);
        props.changeEffectOnOff(!props.useEffect);
    }

    const handleSliderChange = (_event, newValue) => {
        props.setSnowFlake(newValue);
        props.changeSnowFlakeCount(newValue);
    }

    return (
        <div>
            <Drawer
                anchor="right"
                open={props.openSideMenu}
                onClose={() => {
                    props.setOpenSideMenu(false);
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
                        <Button className={classes.btn} onClick={() => setShow(true)}>データリセット</Button>
                        <ResetDataConfirmDialog show={show} setShow={setShow} resetData={props.resetData} />
                        <Button onClick={exportJson} className={classes.btn}>JSONでエクスポート</Button>
                        <div className={classes.effectBoxWrap}>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={props.useEffect} onChange={handleUseEffect} />} label="雪を降らせる" />
                            </FormGroup>
                            <Slider
                                disabled={!props.useEffect}
                                value={props.snowFlake}
                                valueLabelDisplay="auto"
                                onChangeCommitted={handleSliderChange}
                                min={0}
                                max={750}
                            />
                        </div>
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
                                            onClick={() => props.changeBackground(index)}
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
                                            onClick={() => props.changeBackground(image)}
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
