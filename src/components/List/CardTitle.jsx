import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlight from './SyntaxHighlight';

// const useStyle = makeStyles((theme) => ({
//     highLightAtMark: {
//         color: '#1a1a1a',
//         borderBottom: '1px solid rgba(0,0,0,0.2)',
//         backgroundColor: 'rgba(187,239,253,0.3)',
//         // backgroundColor: 'rgba(255,229,100,0.2)',
//     },
// }));

const CardTitle = ({ title }) => {

    //const classes = useStyle();

    // Detect @ before single word and replace with span tag.
    // const detectHighlight = (content) => {
    //     let newContent = content.replace(/(@\S+)/gi, `<span class=${classes.highLightAtMark}>$1</span>`);
    //     return newContent;
    // }

    return (
        // <div dangerouslySetInnerHTML={{ __html: detectHighlight(title) }}></div>
        <ReactMarkdown
            source={title}
            renderers={{
                code: SyntaxHighlight
            }} />
    )
}

export default CardTitle;
