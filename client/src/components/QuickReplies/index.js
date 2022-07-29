import './styles.css';

export function QuickReplies({qr, handleSubmit}){
    
    // console.log("qr print " + JSON.stringify(qr))
    return (
        <>
            {qr.text && 
                <div className="msg bot">
                    <span>{qr.text.stringValue}</span>
                </div>
            }
            <div className= { qr.vertical.boolValue ? "qr-msg-vertical" : "qr-msg" } >
                {qr.quick_replies.listValue.values.map(qr_msg => (
                    <div id={ qr.vertical.boolValue ? "qr-vertical" : "qr" } onClick={(e) => handleSubmit(e, qr_msg.structValue.fields.payload.stringValue, qr_msg.structValue.fields.payload.stringValue)}>
                        <span>{qr_msg.structValue.fields.text.stringValue}</span>
                    </div> 
                ))}
            </div>
        </>
    )
}