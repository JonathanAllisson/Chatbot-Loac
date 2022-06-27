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

if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(5000, () => {
    console.log('Listen in port 5000');
});