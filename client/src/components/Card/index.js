import './styles.css';

export function Card({item, handleSubmit}){

    return (
        <div className="card">
            <img src={item.fields.image.stringValue} alt={item.fields.image.stringValue} />
            <div className="text">
                <h3 className="card-title">{item.fields.header.stringValue}</h3>
                <p className="card-p">{item.fields.description.stringValue}</p>
            </div>
            {
                item.fields.button.structValue.fields.link.boolValue ?
                <a href={item.fields.button.structValue.fields.payload.stringValue} target="_blank" className="card-btn" rel="noreferrer">Visitar <span>&rarr;</span></a>
                :
                <button onClick={(e) => handleSubmit(e, "", item.fields.button.structValue.fields.payload.stringValue)} className="card-btn">Ir <span>&rarr;</span></button>
            }
        </div>
    )
}