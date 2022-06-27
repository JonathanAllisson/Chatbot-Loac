import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
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

    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listen in port ' + process.env.PORT);
});