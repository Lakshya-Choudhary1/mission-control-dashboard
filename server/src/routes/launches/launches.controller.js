import * as launchesModel from "../../models/launches.model.js";


export const getAllLaunches = (req,res) =>{
    return res.status(200).json(launchesModel.getAllLaunches());
}

export const addNewLaunch = (req,res)=>{
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(200).json({
            'error':'Mission required launch property',
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(200).json({
            'error':'Invalid launch date',
        });
    }
    
    launchesModel.addNewLaunch(launch);
    return res.status(201).json(launch);
}

export const deleteLaunch = (req,res) =>{
    const launchId = parseInt(req.params.id);
    
    const aborted = launchesModel.deleteLaunch(launchId);
    if(!aborted){
        return res.status(404).json({
            error:'no launch exists'
        })
    }
   
    
    return res.status(200).json(aborted);
}
