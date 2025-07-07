import express from 'express';
import cors from 'cors';
import morgan from 'morgan' ;
import {dirname} from "path";
import { fileURLToPath } from 'url';
import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js'
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//Access-Control-Allow-Origin
app.use(cors({  
     origin:['http://localhost:3000']
}));
app.use(express.static(__dirname+'/../public'))
app.use(morgan('combined'));
app.use(express.json());
app.use(planetsRouter);
app.use(launchesRouter);

//home route (https://localhost:5000)
app.get('/',(req,res)=>{
     res.sendFile(__dirname+"/../public/index.html");
})

export default app;