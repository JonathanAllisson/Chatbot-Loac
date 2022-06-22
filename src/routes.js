import express from 'express';
import { textQuery, eventQuery } from './chatbot/dialogflow.js';

const router = new express.Router();

router.get('/hello2', (req, res) =>{
    res.send({'hello': 'World'});
})

router.post('/api/df_text_query', async (req, res) => {
  let responses = await textQuery(req.body.text, req.body.userID, req.body.parameters);
  res.send(responses[0].queryResult);
})

router.post('/api/df_event_query', async (req, res) => {
  let responses = await eventQuery(req.body.event, req.body.userID, req.body.parameters);
  res.send(responses[0].queryResult);
})

export { router }