import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {v4 as uuid } from 'uuid';
import { Message } from '../Message';
import { ListCards } from '../ListCards';
import {ReactComponent as Submit} from '../../assets/Send.svg';

import './styles.css';
import { Typing } from '../Typing';
import { QuickReplies } from '../QuickReplies';

export function Main(){

    const [messages, setMessages] = useState([]);
    const [textUser, setTextUser] = useState('');
    const msgRef = useRef();

    const cookies = new Cookies();
    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

    useEffect(() => {
       df_event_query('Welcome');
       if(cookies.get('userID') === undefined){
          cookies.set('userID', uuid(), { path: '/'});
       }
       console.log(cookies.get('userID'));
    }, []);

    useEffect(() => {
       const div = msgRef.current;
       if(div){
          div.scrollTop = div.scrollHeight;
       }
    }, [messages]);

    async function df_text_query(text, saysHuman){
        const res = await axios.post(`${BASE_URL}/api/df_text_query`, {text, userID: cookies.get('userID')});
        
        let messagesList = [];
        for(let msg of res.data.fulfillmentMessages){
            console.log(JSON.stringify(msg))
            let says = {
                speaks: 'bot',
                msg: msg,
            }
            messagesList = [...messagesList, says]
            // setMessages([...messages, saysHuman, says]);
        }
        setMessages([...messages, saysHuman, ...messagesList]);
    }

    async function df_event_query(event){
        //let headers = {'Access-Control-Allow-Origin': '*'}
        const res = await axios.post(`${BASE_URL}/api/df_event_query`, {event, userID: cookies.get('userID')});
        console.log(res.data);
        let messagesList = [];
        for (let msg of res.data.fulfillmentMessages){
            let says = {
                speaks: 'bot',
                msg: msg,
            }
            messagesList = [...messagesList, says]
        }
        setMessages([...messages, ...messagesList]);
        
    }

    async function handleSubmitMsg(e){
        e.preventDefault();
        let textUserAux = textUser;
        setTextUser('');
        // bot digitando
        let typing = {
            speaks: 'bot',
            msg: {
                text : {
                    text: '...'
                }
            }
        };

        console.log("Submit")
        let says = {
            speaks: 'human',
            msg: {
                text : {
                    text: textUserAux
                }
            }
        };
        setMessages([...messages, says, typing]);
        await df_text_query(textUserAux, says);
    }


    async function handleQuickReplyPayload(event, payload, text){
        event.preventDefault();

        switch(payload){
            case 'postback_menu':
                df_event_query('MENU');
                break;
            case 'postback_mn_pt1':
                df_event_query('MINICURSO');
                break;
            default:
                let says = {
                    speaks: 'human',
                    msg: {
                        text : {
                            text
                        }
                    }
                };
                setMessages([...messages, says]);
                df_text_query(text, says)
                break;
        }
    }
    
    return(
        <>
            <div className="container" ref={msgRef}>
                <ul className="box">
                    {messages.map((message, i) => {
                        // console.log(message.msg)
                        if (message.msg.text && message.msg.text.text === '...'){
                            return <Typing />
                        }
                        else if(message.msg && message.msg.text && message.msg.text.text){
                            return <Message key={i} speaks={message.speaks} text={message.msg.text}/>
                        }
                        else if(message.msg && message.msg.payload && message.msg.payload.fields.quick_replies){
                            return <QuickReplies qr={message.msg.payload.fields} handleSubmit={handleQuickReplyPayload} />
                        }
                        else {
                            // console.log(message.msg.payload.fields.cards.listValue.values[0].structValue)
                            // return <Card key={i} payload={message.msg.payload.fields.cards.listValue.values[0].structValue}/>
                            return <ListCards propsCards = {message.msg.payload.fields.cards.listValue.values}/>
                        }
                    })}
                </ul>
            </div>
            <form className='wrapper' onSubmit={e => handleSubmitMsg(e)}>
                <input type="text" value={textUser} onChange={e => setTextUser(e.target.value)} />
                <button><Submit /></button>
            </form>
        </>
    )
}

