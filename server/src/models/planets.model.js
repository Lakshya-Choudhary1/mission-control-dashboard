import {parse} from "csv-parse";
import fs, { promises } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const habitablePlanets = [];

const __dirname = dirname(fileURLToPath(import.meta.url)); 

const isHabitablePlanet = (planet) =>{
  return planet.koi_disposition === 'CONFIRMED' 
        && planet.koi_insol > 0.36
        && planet.koi_insol <1.11
        && planet.koi_prad <1.6
}

export const loadPlanetsData = () =>{
  return new Promise((resolve,reject)=>{
    fs.createReadStream(__dirname +'../../../data/' + 'kepler_data.csv')
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