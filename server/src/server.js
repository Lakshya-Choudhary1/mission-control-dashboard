import {createServer} from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import {loadPlanetsData} from "./models/planets.model.js"
import {loadLaunchesData} from "./models/launches.model.js"
import initDb from "./services/mongo.js"

dotenv.config();

const PORT = process.env.PORT || 8888 ;
const MONGO_URL = process.env.MONGO_URL;
const server = createServer(app);

const startServer = async() =>{
     await initDb(MONGO_URL)
     await loadPlanetsData();     
     await loadLaunchesData();
     server.listen(PORT,()=>{
          console.log(`SERVER IS LISTENING ON PORT ${PORT}!`);
     })
}

startServer();



