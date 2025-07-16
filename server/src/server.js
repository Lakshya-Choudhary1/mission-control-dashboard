import {createServer} from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import {loadPlanetsData} from "./models/planets.model.js"
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || 8888 ;

const MONGO_URL = "mongodb+srv://nasa-api:sZ1eOGcbe83ytEFr@cluster0.3swbr4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

const server = createServer(app);

const startServer = async() =>{
     await loadPlanetsData();     
     server.listen(PORT,()=>{
          console.log(`SERVER IS LISTENING ON PORT ${PORT}!`);
     })
}

startServer();



