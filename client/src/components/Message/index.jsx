import { addLineBreaks } from '../../util/formatMsg';

export function Message({ speaks, text }){   

    return (
        <div className={`msg ${speaks}`}>
            <span id='span-msg' className={`sp-${speaks}`}>{addLineBreaks(text.text.toString())}</span>
        </div>
    )
}