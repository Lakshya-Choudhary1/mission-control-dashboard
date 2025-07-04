import {createServer} from 'http';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 8888 ;
const server = createServer(app);

server.listen(PORT,()=>{
     console.log(`SERVER IS LISTENING ON PORT ${PORT}!`);
})
