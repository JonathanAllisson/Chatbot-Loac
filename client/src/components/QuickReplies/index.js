import './styles.css';

export function QuickReplies({qr, handleSubmit}){
    
    return (
        <>
            {qr.text && 
                <div className="msg bot">
                    <span>{qr.text.stringValue}</span>
                </div>
            }
            <div className="msg" onClick={(e) => handleSubmit()}>
                <span id="qr">teste</span>
            </div>
        </>
    )
}