import './styles.css';

export function Card({item}){

    // console.log(props)
    return (
        <div className="card">
            <img src={item.fields.image.stringValue} alt={item.fields.image.stringValue} />
            <div className="text">
                <h3 className="card-title">{item.fields.header.stringValue}</h3>
                <p className="card-p">{item.fields.description.stringValue}</p>
            </div>
            <a href={item.fields.link.stringValue} target="_blank" className="card-btn" rel="noreferrer">Visitar <span>&rarr;</span></a>
        </div>
    )
}