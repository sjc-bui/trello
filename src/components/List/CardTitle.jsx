import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    highLightAtMark: {
        color: '#1a1a1a',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(187,239,253,0.3)',
    },
    highLightSharp: {
        color: '#1a1a1a',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255,229,100,0.2)',
    }
}));

const CardTitle = ({ title }) => {

    const classes = useStyle();

    const detectHighlight = (content) => {
        let newContent = content.replace(/(@\S+)/gi, `<span class=${classes.highLightAtMark}>$1</span>`);
        newContent = newContent.replace(/(#\S+)/gi, `<span class=${classes.highLightSharp}>$1</span>`);
        return newContent;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: detectHighlight(title) }}></div>
    )
}

export default CardTitle;