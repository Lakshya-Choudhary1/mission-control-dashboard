import express from 'express';
import cors from 'cors';
import planetsRouter from './routes/planets/planets.router.js';

const app = express();

//Access-Control-Allow-Origin
const whiteListing_URL = ['http://localhost:3000'];

app.use(cors({
     origin:(origin,callback)=>{
          if(whiteListing_URL.indexOf(origin) !== -1){
               callback(null,true);
          }else{
               callback(new Error("Origin Not Allows"))
          }
     }
}));

app.use(express.json());
app.use(planetsRouter);

export default app;