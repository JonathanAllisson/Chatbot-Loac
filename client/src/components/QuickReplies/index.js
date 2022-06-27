import './styles.css';

export function QuickReplies({qr, handleSubmit}){
    
    console.log(JSON.stringify(qr.quick_replies))
    return (
        <>
            {qr.text && 
                <div className="msg bot">
                    <span>{qr.text.stringValue}</span>
                </div>
            }
            <div className="qr-msg">
                {qr.quick_replies.listValue.values.map(qr_msg => (
                    <div onClick={(e) => handleSubmit(e, qr_msg.structValue.fields.payload.stringValue, qr_msg.structValue.fields.payload.stringValue)}>
                        <span id="qr">{qr_msg.structValue.fields.text.stringValue}</span>
                    </div> 
                ))}
            </div>
        </>
    )
}