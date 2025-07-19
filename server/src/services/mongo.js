import mongoose from 'mongoose';

mongoose.connection.once('connect',()=>{
     console.log('mongo db connected ');
})

mongoose.connection.on('error',()=>{
     console.error({'err':error})
})
const initDb = async(MONGO_URL)=>{
    await mongoose.connect(MONGO_URL);
} 
export default  initDb;
