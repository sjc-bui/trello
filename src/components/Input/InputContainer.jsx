import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core';
import InputCard from './InputCard';
import { useState } from 'react';
import { withNamespaces } from 'react-i18next';

const useStyle = makeStyles((theme) => ({
    root: {
        paddingBottom: '1px',
    },
    addCard: {
        padding: '8px 8px',
        margin: theme.spacing(0, 1, 1, 1),
        background: '#ebecf099',
        minWidth: '283px',
        '&:hover': {
            backgroundColor: fade('#fff', 0.85),
            cursor: 'pointer'
        },
    },
    title: {
        fontSize: '14px',
    },
}));

const InputContainer = (props) =>
{
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            {open ?
                <div>
                    <InputCard type={props.type} setOpen={setOpen} listId={props.listId} />
                </div>
                :
                <div>
                    <Paper onClick={() => { setOpen(!open) }} className={classes.addCard} elevation={0}>
                        <Typography
                            className={classes.title}
                            style={{
                                color: props.type === 'card' ? '#5e6c84' : '#ffffff'
                            }}>
                            ＋ {props.type === 'card' ?
                                props.cardLength === 0 ?
                                    <span>{props.t('addCard')}</span> :
                                    <span>{props.t('addAnotherCard')}</span>
                                : props.listLength === 0 ?
                                    <span>{props.t('addList')}</span> :
                                    <span>{props.t('addAnotherList')}</span>}
                        </Typography>
                    </Paper>
                </div>
            }
        </div>
    )
}

export default withNamespaces()(InputContainer);
