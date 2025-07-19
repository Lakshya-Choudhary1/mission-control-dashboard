import {getPlanet} from "../../models/planets.model.js";
export const getAllPlanets = async (req,res) =>{
     return  res.status(200).json(await getPlanet());
}


