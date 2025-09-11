import axios from "axios";

import launchesDatabase from "./launches.schema.js";
import planetsDatabase from "./planets.schema.js";

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';



const getLatestFlightNumber = async() =>{
     const launch  = await launchesDatabase
          .findOne()
          .sort('-flightNumber');

     if(!launch) return DEFAULT_FLIGHT_NUMBER;

     return ++launch.flightNumber;
}

const findLaunch = async(filter)=>{
     return await launchesDatabase.findOne(filter);
}

export const launchIdExists =  async(launchId) =>{
     return  await findLaunch({
          flightNumber:launchId
     })
}

const saveLaunches =async(launch)=>{
    
     await launchesDatabase.findOneAndUpdate({
          flightNumber: launch.flightNumber,
     },launch,{upsert:true,})
}

export const loadLaunchesData = async()=>{
      
     const firstLaunch =  await findLaunch({
         flightNumber:1,
     })

     if(firstLaunch) return;
     console.log('downloading launches');
     const response =   await axios.post(SPACEX_API_URL,{
          query:{},
          options:{
               page:2,
               limit:20,
               pagination:false,
               populate:[
                    {
                         path:'rocket',
                         select:{
                              name:1,
                         }
                    },{
                         path:'payloads',
                         options:{
                              customers:1
                         }
                    }
               ]
          }
     })

     response.data.docs.forEach(async(e) => {
          const launch = {
               flightNumber:e.flight_number,
               mission:e.name,
               rocket:e.rocket.name,
               launchDate:new Date(e.date_local),
               target:'NOT Applicable',
               upcoming:e.upcoming,
               success:e.success,
               customers:e.payloads.flatMap(val=>val.customers)
          }
          await saveLaunches(launch)
     });
}

// launches.set(launch1.flightNumber,launch1);
export const deleteLaunch =  async(launchId) =>{
     const launch = await launchesDatabase.updateOne(
          {    flightNumber:launchId
          },{success:false,upcoming:false})
     return launch.acknowledged === true;
}

export const addNewLaunch = async(launch) =>{
      const planets =  await planetsDatabase.findOne({
          keplerName:launch.target,
     })
     if(!planets){
          return {err:"planet already exist"};
     }
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

export const getAllLaunches = async(skip,limit) =>{
     return await launchesDatabase
     .find({},{'__v':0,'_id':0})
     .sort('-flightNumber')
     .skip(skip)
     .limit(limit)
}



