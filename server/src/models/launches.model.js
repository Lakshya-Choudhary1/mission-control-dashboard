import launchesDatabase from "./launches.schema.js";
import planetsDatabase from "./planets.schema.js";


const DEFAULT_FLIGHT_NUMBER = 100;
const getLatestFlightNumber = async() =>{
     const launch  = await launchesDatabase
          .findOne()
          .sort('-flightNumber');

     if(!launch) return DEFAULT_FLIGHT_NUMBER;

     return ++launch.flightNumber;
}

export const launchIdExists =  async(launchId) =>{
     return  await launchesDatabase.findOne({
          flightNumber:launchId
     })
}

const saveLaunches =async(launch)=>{
     const planets =  await planetsDatabase.findOne({
          keplerName:launch.target,
     })
     if(!planets){
          throw new Error('NOT PLANETS EXISTS')
     }
     await launchesDatabase.findOneAndUpdate({
          flightNumber: launch.flightNumber,
     },launch,{upsert:true,})
}


// launches.set(launch1.flightNumber,launch1);
export const deleteLaunch =  async(launchId) =>{
     const launch = await launchesDatabase.updateOne(
          {    flightNumber:launchId
          },{success:false,upcoming:false})
     return launch.acknowledged === true;
}
export const addNewLaunch = async(launch) =>{
     const latestFlightNumber = await getLatestFlightNumber();
     const newLaunch = Object.assign(launch,{
          flightNumber:latestFlightNumber,
          success:true,
          upcoming:true,
          customers:['ZTM','HYE-VSM'],
     })
     await saveLaunches(newLaunch);
     return newLaunch
}

export const getAllLaunches = async() =>{
     return await launchesDatabase.find({},{'__v':0,'_id':0});
}



