import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const CardTitle = ({ title }) => {
    return (
        <MDEditor.Markdown source={title} />
    )
}

export default CardTitle;
