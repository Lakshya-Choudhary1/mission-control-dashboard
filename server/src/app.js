import express from 'express';
import cors from 'cors';
import morgan from 'morgan' ;
import path,{dirname} from "path";
import url from 'url';
import fs from "fs";

import api from './routes/api.js';

const app = express();
const _dirname = dirname(url.fileURLToPath(import.meta.url));

const accessLogStream = fs.createWriteStream(_dirname+'/../log/access.log',{flags:'a'});
//Access-Control-Allow-Origin
app.use(cors({  
     origin:['http://localhost:3000']
}));
app.use(express.static(path.join(_dirname,'..','public')))
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use('/v1',api);


//home route (https://localhost:5000)
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

export default app;