import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ColorPicker from './ColorPicker';
import SyntaxHighlight from './SyntaxHighlight';
import { makeStyles } from '@material-ui/core/styles';
import { isNullOrWhiteSpaces } from '../../utils/helper';
import { withNamespaces } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';

const useStyle = makeStyles((theme) => ({
    textArea: {
        minWidth: '500px',
        maxWidth: '600px',
        marginTop: theme.spacing(1),
    },
    explainTitle: {
        marginTop: theme.spacing(2),
        borderBottom: '1px solid #ddd',
        paddingBottom: theme.spacing(2),
    },
    explainText: {
        paddingBottom: theme.spacing(1),
    },
    subtitle: {
        fontSize: '11px',
        backgroundColor: 'rgba(187,239,253,0.3)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        color: '#1a1a1a',
    },
    editDes: {
        textDecoration: 'underline',
        color: '#727272',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    btn: {
        cursor: 'pointer',
        textTransform: 'none',
        padding: '6px 12px',
    },
    active: {
        cursor: 'pointer',
        fontWeight: 600,
        padding: '6px 12px',
    },
    titleWrap: {
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    newCardTitle: {
        cursor: 'text',
    },
    followFlag: {
        color: '#00b600',
        fontWeight: 600,
        marginLeft: theme.spacing(1),
    },
    customIcon: {
        fontSize: '1.2rem',
        color: '#959595',
        marginRight: '4px',
    },
    followBtn: {
        marginTop: theme.spacing(1),
        backgroundColor: '#091e420a',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#091e4221',
        }
    },
    previewText: {
        fontSize: '14px',
        marginTop: theme.spacing(1),
        color: '#24292e',
    },
    listLabel: {
        backgroundColor: 'rgba(187,239,253,0.3)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        color: '#1a1a1a',
        fontSize: '16px',
        '&:hover': {
            backgroundColor: '#bbeffd',
            borderBottomColor: '#1a1a1a',
        }
    },
    listTitleWrap: {
        fontSize: '15px',
        color: '#5e6c84',
    },
    datePickerWrap: {
        marginTop: theme.spacing(1),
    }
}));

const CardOptionDialog = (props) => {
    const classes = useStyle();

    const [follow, setFollow] = useState(props.card.follow);
    const [newTitle, setNewTitle] = useState(props.card.title);
    const [newDes, setNewDes] = useState(props.card.description);
    const [borderColor, setBorderColor] = useState(props.card.label);
    const [dueDate, setDueDate] = useState(props.card.due_date);
    const [dueDateComplete, setDueDateComplete] = useState(props.card.due_date_complete);

    const [open, setOpen] = useState(false);
    const [changed, setChanged] = useState(false);
    const [colorPickerShow, setPickerShow] = useState(false);
    const [openEditTitle, setOpenEditTitle] = useState(false);

    const handleClose = () => {
        props.setShow(false);
    };

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
        setChanged(true);
    }

    const handleOnChangeDes = (e) => {
        setNewDes(e.target.value);
        setChanged(true);
    }

    const handleCardFollow = () => {
        setFollow(!follow)
        setChanged(true);
    }

    const updateCardTitle = () => {
        if (isNullOrWhiteSpaces(newTitle)) return;
        props.handleUpdateCardTitle(newTitle.trim(), newDes, follow, borderColor, dueDate, dueDateComplete);
        handleClose();
        setChanged(false);
    }

    const handleOnBlur = () => {
        if (isNullOrWhiteSpaces(newTitle)) return;
        setOpenEditTitle(false);
    }

    const onFocus = (e) => {
        var temp_val = e.target.value;
        e.target.value = '';
        e.target.value = temp_val;
    }

    const handleChangeDueDate = (e) => {
        setDueDate(e.target.value);
        setChanged(true);
    }

    const clearDueDate = () => {
        setDueDate("");
        setChanged(true);
    }

    const handleChangeDueDateComplete = (e) => {
        setDueDateComplete(e.target.checked);
        setChanged(true);
    }

    return (
        <div>
            <Dialog
                open={props.show}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{
                    borderLeft: `8px solid ${borderColor}`
                }}>
                    <DialogContent>
                        <Typography className={classes.listTitleWrap}>{props.t('inListTitle')}&nbsp;<span className={classes.listLabel}>{props.listTitle}</span></Typography>
                        <Divider />

                        {openEditTitle ? (
                            <TextField
                                fullWidth
                                multiline
                                autoFocus
                                onFocus={onFocus}
                                onBlur={handleOnBlur}
                                className={classes.textArea}
                                value={newTitle}
                                onChange={handleOnChange} />
                        ) : (
                                <div className={classes.titleWrap}>
                                    <Typography className={classes.newCardTitle} onClick={() => setOpenEditTitle(true)}>{newTitle}</Typography>
                                </div>
                            )}

                        <Typography className={classes.explainTitle}>
                            {props.t('descriptionLabel')}: &nbsp;&nbsp;
                        <span className={open ? classes.active : classes.btn} onClick={() => setOpen(true)}>{props.t('editBtn')}</span>
                        &nbsp;&nbsp;
                        <span className={!open ? classes.active : classes.btn} onClick={() => setOpen(false)}>{props.t('previewBtn')}</span>
                        </Typography>
                        {open ? (
                            <div>
                                <TextField
                                    fullWidth
                                    multiline
                                    autoFocus
                                    onFocus={onFocus}
                                    className={classes.explainText}
                                    onChange={handleOnChangeDes}
                                    value={newDes}
                                    placeholder={props.t('inputDesPlaceholder')} />
                                <span className={classes.subtitle}>{props.t('markdownSupport')}</span>
                            </div>
                        ) : (
                                <div>
                                    {newDes.length !== 0 ?
                                        <ReactMarkdown
                                            source={newDes}
                                            renderers={{
                                                code: SyntaxHighlight
                                            }} /> :
                                        <div className={classes.previewText}>
                                            {props.t('nothingPreviewLabel')}
                                        </div>
                                    }
                                </div>
                            )}
                        <div>
                            <Button className={classes.followBtn} onClick={() => setPickerShow(!colorPickerShow)}>
                                {props.t('labelsBtn')}
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                className={classes.followBtn}
                                onClick={handleCardFollow}>
                                <VisibilityOutlinedIcon className={classes.customIcon} />
                                {props.t('watchBtn')}
                                {follow ?
                                    <span className={classes.followFlag}>✔</span> :
                                    ('')}
                            </Button>
                            {colorPickerShow ?
                                <ColorPicker setChanged={setChanged} borderColor={borderColor} setBorderColor={setBorderColor} />
                                : ''}

                            <div className={classes.datePickerWrap}>
                                <TextField
                                    id="date"
                                    label={props.t('dueDateLabel')}
                                    type="datetime-local"
                                    value={dueDate}
                                    className={classes.textField}
                                    onChange={handleChangeDueDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </div>
                            {dueDate.length !== 0 ?
                                <div>
                                    <Checkbox
                                        checked={dueDateComplete}
                                        onChange={handleChangeDueDateComplete}
                                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    <span>完了済み</span>&nbsp;|&nbsp;
                                    <span onClick={clearDueDate}>期限削除</span>
                                </div>
                                : ''}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.btn} color="default" onClick={handleClose}>{props.t('cancelBtn')}</Button>
                        <Button className={classes.btn} color="secondary" onClick={props.handleDeleteCard}>{props.t('deleteBtn')}</Button>
                        <Button className={classes.btn} disabled={!changed} color="primary" onClick={updateCardTitle}>{props.t('updateBtn')}</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default withNamespaces()(CardOptionDialog);
