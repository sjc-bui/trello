import React from 'react';
import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    labelWrap: {
        marginTop: theme.spacing(1),
    },
    deleteLabel: {
        fontSize: '12px',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}))

const ColorPicker = (props) => {
    const classes = useStyle();

    const handleOnChange = (color) => {
        props.setBorderColor(color.hex);
        props.setChanged(true);
    }

    const removeLabel = () => {
        props.setBorderColor('#ffffff00');
        props.setChanged(true);
    }

    return (
        <div className={classes.root}>
            <TwitterPicker color={props.borderColor} onChangeComplete={handleOnChange} />
            <div className={classes.labelWrap}>
                <span onClick={removeLabel} className={classes.deleteLabel}>{props.t('clearLabel')}</span>
            </div>
        </div>
    )
}

export default withNamespaces()(ColorPicker);
