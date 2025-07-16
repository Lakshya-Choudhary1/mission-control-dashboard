import express from 'express';
import cors from 'cors';
import morgan from 'morgan' ;
import path from "path";
import url from 'url';
import fs from "fs";
import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js'

const app = express();
const _dirname = path.dirname(url.fileURLToPath(import.meta.url));

const accessLogStream = fs.createWriteStream(_dirname+'/../log/access.log',{flags:'a'});
//Access-Control-Allow-Origin
app.use(cors({  
     origin:['http://localhost:3000']
}));
app.use(express.static(path.join(_dirname,'..','public')))
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);

//home route (https://localhost:5000)
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

export default app;