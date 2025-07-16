import {parse} from "csv-parse";
import fs, { promises } from "fs";
import path,{dirname} from "path";
const habitablePlanets = [];
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url))
const isHabitablePlanet = (planet) =>{
  return planet.koi_disposition === 'CONFIRMED' 
        && planet.koi_insol > 0.36
        && planet.koi_insol <1.11
        && planet.koi_prad <1.6
}

export const loadPlanetsData = () =>{
  return new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(_dirname ,'../../../server/data/' , 'kepler_data.csv'))
      .pipe(parse({
          comment:"#",
          columns:true
      }))
      .on('data',(data) =>{
        if(isHabitablePlanet(data)){
          habitablePlanets.push(data)
        }
      })
      .on('err',(err)=>{
        console.log('error occured : ' , err);
        reject(err);
      })
      .on('end',()=>{
        resolve();
      })
      
  })
}

export default habitablePlanets ;