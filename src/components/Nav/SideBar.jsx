import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Grow, FormControl, InputLabel, Select, MenuItem, Button, Typography, FormGroup } from '@material-ui/core';
import colors from '../../utils/color';
import images from '../../utils/images';
import dateTimeFormat from '../../utils/datetimeFormat';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import ResetDataConfirmDialog from './ResetDataConfirmDialog';

import { withNamespaces } from 'react-i18next';
import { getLocalStorageData } from '../../utils/helper';
import { useContext } from 'react';
import storeApi from '../../utils/storeApi';
import moment from 'moment';

import loadingGift from '../../images/loading.gif';

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
        borderRadius: '8px',
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
        margin: theme.spacing(3, 1, 1, 1)
    },
    formControl: {
        minWidth: '200px',
    },
    resetBtn: {
        marginTop: theme.spacing(3)
    },
    menuTitle: {
        textAlign: 'center',
        color: '#172b4d',
        fontSize: '14px',
    },
    btn: {
        margin: theme.spacing(0, 1, 0, 0),
        textTransform: 'none',
    },
    effectBoxWrap: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    loading: {
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '20px auto',
        position: 'relative',
        outline: 'none',
    },
    loadTargetLang: {
        fontSize: '14px',
    }
}))

const SideBar = (props) => {

    const classes = useStyle();

    const { changeDisplayLanguage, changeDateTimeFormatType } = useContext(storeApi);

    const [show, setShow] = useState(false);
    const [openColorOptions, setOpenColorOptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lng, setLng] = useState(props.lang);
    const [formatType, setFormatType] = useState(props.formatType);

    const exportJson = () => {
        var jsonObj = getLocalStorageData('data');
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

    const onChangeLanguage = (e) => {
        const selectedLang = e.target.value;
        setLng(selectedLang);
        setLoading(true);

        setTimeout(() => {
            changeDisplayLanguage(selectedLang);
            setLoading(false);

            setTimeout(() => {
                window.location.reload();
            }, 250);
        }, 4500);
    }

    const onChangeFormatType = (e) => {
        const type = e.target.value;
        setFormatType(type);
        changeDateTimeFormatType(type);
    }

    const now = Date.now();

    return (
        <div>
            <Drawer
                anchor="right"
                open={props.openSideMenu}
                onClose={() => {
                    props.setOpenSideMenu(false);
                }}>
                <div className={classes.selectForm}>

                    {/* Select display language */}
                    <FormControl className={classes.formControl}>
                        <InputLabel>{props.t('language')}</InputLabel>
                        <Select value={lng} onChange={onChangeLanguage}>
                            <MenuItem value="en">{props.t('english')}</MenuItem>
                            <MenuItem value="ja">{props.t('japanese')}</MenuItem>
                            <MenuItem value="vi">{props.t('vietnamese')}</MenuItem>
                        </Select>
                    </FormControl>
                    {loading ?
                        <div className={classes.loading}>
                            <img width="30px" height="30px" src={loadingGift} alt="" />
                            <div>{lng === 'en' ?
                                <Typography className={classes.loadTargetLang}>{props.t('toEn')}</Typography> :
                                lng === 'ja' ?
                                    <Typography className={classes.loadTargetLang}>{props.t('toJa')}</Typography> :
                                    <Typography className={classes.loadTargetLang}>{props.t('toVi')}</Typography>}
                            </div>
                        </div>
                        : ''}

                    {/* Set timestamp format */}
                    <div style={{
                        marginTop: '26px',
                    }}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{props.t('timeStampLabel')}</InputLabel>
                            <Select value={formatType} onChange={onChangeFormatType}>
                                {dateTimeFormat.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>{moment(now).locale(lng).format(item)}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.resetBtn}>
                        <Button className={classes.btn} onClick={() => setShow(true)}>{props.t('resetDataBtn')}</Button>
                        <ResetDataConfirmDialog show={show} setShow={setShow} resetData={props.resetData} />
                        <Button onClick={exportJson} className={classes.btn}>{props.t('exportBtn')}</Button>
                        <div className={classes.effectBoxWrap}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={props.useEffect}
                                            onChange={handleUseEffect} />
                                    }
                                    label={props.t('effectLabel')} />
                            </FormGroup>
                            <Slider
                                disabled={!props.useEffect}
                                value={props.snowFlake}
                                valueLabelDisplay="auto"
                                onChangeCommitted={handleSliderChange}
                                min={0}
                                max={750} />
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
                                border: !openColorOptions ? '3px solid #e2e2e2' : 'none',
                            }}
                            onClick={() => setOpenColorOptions(false)}>
                        </div>
                        <div
                            className={classes.box}
                            style={{
                                backgroundImage: 'url(https://www.color-hex.com/palettes/7900.png)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                border: openColorOptions ? '3px solid #e2e2e2' : 'none',
                            }}
                            onClick={() => setOpenColorOptions(true)}>
                        </div>
                    </div>

                    <Typography className={classes.menuTitle}>
                        {openColorOptions ?
                            <span>{props.t('colors')}</span> :
                            <span>{props.t('photos')}</span>}
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
                                            onClick={() => props.changeBackground(index)}>
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
                                            onClick={() => props.changeBackground(image)}>
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow>}
                </div>
            </Drawer>
        </div>
    )
}

export default withNamespaces()(SideBar);
