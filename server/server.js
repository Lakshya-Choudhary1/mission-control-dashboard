import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
     res.json({"info":"working"})
})

app.listen(PORT,()=>{
     console.log(`server is listening on port ${PORT}!`)
})

