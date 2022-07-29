import "./style.css";

export function ChatImage({url}){

    console.log("logg " + JSON.stringify(url))
    return (
        <div>
            <img className="img-bot" src={url.img.stringValue} alt={url.img.stringValue} />
        </div>
    )
}