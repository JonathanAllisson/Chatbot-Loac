import { addLineBreaks } from '../../util/formatMsg';

export function Message({ speaks, text }){   

    return (
        <div className={`msg ${speaks}`}>
            <div className='msg-text'>{addLineBreaks(text.text.toString())}</div>
        </div>
    )
}