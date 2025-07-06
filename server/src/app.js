import express from 'express';
import cors from 'cors';
import path from 'path';
import planetsRouter from './routes/planets/planets.router.js';
import {dirname} from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(__dirname+'/../public'))
//Access-Control-Allow-Origin
const whiteListing_URL = ['http://localhost:3000','http://localhost:5000'];
app.use(cors())
// app.use(cors({  
//      origin:(origin,callback)=>{
//           if(whiteListing_URL.indexOf(origin) !== -1){
//                callback(null,true);
//           }else{
//                callback(new Error("Origin Not Allows"))
//           }
//      }
// }));

app.use(express.json());
app.use(planetsRouter);

app.get('/',(req,res)=>{
     res.sendFile(__dirname+"/../public/idex.html");
})

export default app;