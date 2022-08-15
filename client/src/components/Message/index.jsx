import { addLineBreaks } from '../../util/formatMsg';

export function Message({ speaks, text }){   

    return (
        <div className={`msg ${speaks}`}>
            <span className='span-msg' id={`sp-${speaks}`}>{addLineBreaks(text.text.toString())}</span>
        </div>
    )
}