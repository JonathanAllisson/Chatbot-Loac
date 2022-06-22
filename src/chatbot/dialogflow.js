import dialogflow from 'dialogflow';
import structjson from 'structjson';
import * as uuid from 'uuid';


export function configPrivateKey(key) {
    try {
      const stringifyKey = JSON.stringify(key.toString()).replace(
        /\\\\n|\\n/g,
        '\n'
      );
  
      return JSON.parse(stringifyKey);
    } catch (error) {
      return key.replace(/\\\\n|\\n/g, '\n');
    }
  }

const credentials = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: configPrivateKey(process.env.PRIVATE_KEY)
}

const sessionClient = new dialogflow.SessionsClient({projectID: process.env.PROJECTID, credentials: credentials});

// const sessionPath = sessionClient.sessionPath(process.env.PROJECTID, uuid.v4());

const textQuery = async function(text, userID, parameters = {}){
    
    let sessionPath = sessionClient.sessionPath(process.env.PROJECTID, process.env.DIALOGFLOWSESSIONID + userID);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'pt-BR',
            },
        },
        queryParams: {
            payload: {
                data: parameters
            }
        }
    };
     
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
}

const eventQuery = async function(event, userID, parameters = {}){
    
    let sessionPath = sessionClient.sessionPath(process.env.PROJECTID, process.env.DIALOGFLOWSESSIONID + userID);
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: event,
                parameters: structjson.jsonToStructProto(parameters), 
                languageCode: 'pt-BR',
            }
        }
    };
     
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
}

const handleAction = function(responses){
    return responses;
// }
}

export {textQuery, eventQuery}