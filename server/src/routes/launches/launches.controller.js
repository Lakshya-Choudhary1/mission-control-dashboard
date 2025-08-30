import * as launchesModel from "../../models/launches.model.js";
import getPagination from "../../services/query.js"

export const getAllLaunches = async(req,res) =>{
    const query = req.query;
    const {skip,limit} = getPagination(query)
    return res.status(200).json(await launchesModel.getAllLaunches(skip,limit));
}

export const addNewLaunch = async(req,res)=>{
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            'error':'Missing required launch property',
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            'error':'Invalid launch date',
        });
    }
    
    const added = await  launchesModel.addNewLaunch(launch);
    return res.status(201).json(added);
}

export const deleteLaunch = async(req,res) =>{
    const launchId = parseInt(req.params.id);
    const launch  = await launchesModel.launchIdExists(launchId)
    if(!launch){
        return res.status(404).json({
            error:'no launch exists'
        })
    }
    const aborted = await launchesModel.deleteLaunch(launchId);
    if(!aborted) return res.status(400).json({acknoledged:aborted});
    return res.status(200).json({acknoledged:aborted,status:"successfull deletion"});
}
