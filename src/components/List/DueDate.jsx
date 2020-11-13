import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
    dueDateText: {
        fontSize: '13px',
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

    return (
        <span
            className={classes.dueDateText}
            style={{
                color: due_time === 0 ? '#eb5a46' : due_time === 2 ? '#61bd4f' : '#5e6c84',
            }}>
            {props.card.due_date}
        </span>
    );
}

export default DueDate;
