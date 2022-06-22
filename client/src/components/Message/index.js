export function Message({ speaks, text }){

    return (
        <div className={`msg ${speaks}`}>
            <span>{text.text}</span>
        </div>
    )
}