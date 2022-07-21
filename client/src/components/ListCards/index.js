import { Card } from '../Card/index'; 
import './style.css';

export function ListCards(props){

    return (
        <ul className = "list-cards">
            {props.propsCards.map(i => (
                <Card item={i.structValue} handleSubmit={props.handleSubmit} />
            ))}
        </ul>
    )
}