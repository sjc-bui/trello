import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

const Timer = ({ t, lastUpdated }) =>
{
    const [timeAgo, setTimeAgo] = useState(lastUpdated);

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setTimeAgo(lastUpdated);
        }, 60000);

        return () =>
        {
            clearInterval(interval);
        }
    }, [lastUpdated])

    return (
        <>
            <Typography style={{
                color: '#dddddd',
                fontSize: '14px',
            }}>
                <span>{t('lastUpdated')}:</span>&nbsp;
                    <span>{timeAgo}</span>
            </Typography>
        </>
    )
}

export default withNamespaces()(Timer);
