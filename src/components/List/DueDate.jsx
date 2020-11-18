import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/ja';
import dateTimeFormat from '../../utils/datetimeFormat';

const useStyle = makeStyles(() => ({
    dueDateText: {
        fontSize: '13px',
        padding: '2px 6px 1px',
        borderRadius: '4px',
    }
}));

const HandleDueDate = (card) => {
    const due = Date.parse(card.due_date);
    const now = Date.now();

    if (due > now) {
        return 1; // due later
    } else {
        if (card.due_date_complete) {
            return 2; // due date completed
        }

        return 0; // over due
    }
}

const DueDate = (props) => {
    const classes = useStyle();
    const due_time = HandleDueDate(props.card);

    const format = dateTimeFormat[props.formatType];

    return (
        <span
            className={classes.dueDateText}
            style={{
                background: due_time === 0 ? '#eb5a46' : due_time === 2 ? '#61bd4f' : 'none',
                color: due_time === 1 ? '#262626' : '#ffffff',
            }}>
            {moment(props.card.due_date).locale(props.lang).format(format)}
        </span>
    );
}

export default DueDate;
