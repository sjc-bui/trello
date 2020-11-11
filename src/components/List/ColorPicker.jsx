import React from 'react';
import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';

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

const ColorPicker = ({ setChanged, borderColor, setBorderColor }) => {
    const classes = useStyle();

    const handleOnChange = (color) => {
        setBorderColor(color.hex);
        setChanged(true);
    }

    const removeLabel = () => {
        setBorderColor('#ffffff00');
        setChanged(true);
    }

    return (
        <div className={classes.root}>
            <TwitterPicker color={borderColor} onChangeComplete={handleOnChange} />
            <div className={classes.labelWrap}>
                <span onClick={removeLabel} className={classes.deleteLabel}>ラベル削除</span>
            </div>
        </div>
    )
}

export default ColorPicker;
