import React from 'react';

export const addLineBreaks = string => 
    string.split('\n').map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
            {formatcolors(text)}
            <br />
        </React.Fragment>
));

const formatcolors = t => {
    if(t.includes('-f*')){
        let textArray = t.split('-f*');
        if(textArray.length < 2) return t;
        return <React.Fragment> <span className='negrito'> {textArray[1]} </span> {textArray[2]} </React.Fragment>;
    }
    else if(t.includes('-frd')){
        let textArray = t.split('-frd');
        if(textArray.length < 2) return t;
        return <React.Fragment> <span className='red'> {textArray[1]} </span> {textArray[2]} </React.Fragment>;
    }
    else if(t.includes('-fbl')){
        let textArray = t.split('-fbl');
        if(textArray.length < 2) return t;
        return <React.Fragment> <span className='blue'> {textArray[1]} </span> {textArray[2]} </React.Fragment>;
    }
    else if(t.includes('-fgr')){
        let textArray = t.split('-fgr');
        if(textArray.length < 2) return t;
        return <React.Fragment> <span className='green'> {textArray[1]} </span> {textArray[2]} </React.Fragment>;
    }
    else{
        return t;
    }
    
}