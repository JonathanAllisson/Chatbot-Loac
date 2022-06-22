import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { router } from './routes.js';

const app = express();
app.use(cors({}));
app.use(express.json());

app.get('/hello', (req, res) =>{
    res.send({'hello': 'World'});
})

app.use(router);

app.listen(5000, () => {
    console.log('Listen in port 5000');
});