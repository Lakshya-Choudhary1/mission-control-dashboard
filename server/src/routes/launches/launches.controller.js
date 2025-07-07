import * as launchesModel from "../../models/launches.model.js";


export const getAllLaunches = (req,res) =>{
    return res.status(200).json(launchesModel.getAllLaunches());
}

export const addNewLaunch = (req,res)=>{
     try{
          const launch = req.body;
          launch.launchDate = new Date(launch.launchDate);
          launchesModel.addNewLaunch(launch);
          return res.status(201).json(launch);
     }catch(err){
          console.log(err)
          res.status(209).send(err);
     }
}
