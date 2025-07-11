const launches = new Map();

let latestFlightNumber = 100;
const launch1 = {
     flightNumber:100,
     mission: 'Kepler Exploration X',
     rocket:'Explorer IS1',
     launchDate:new Date('December 27, 2030'),
     target:'Kepler-442 b',
     customers:['ZTM','HYE-VSM'],
     upcoming:true,
     success:true
}

launches.set(launch1.flightNumber,launch1);

export const existsLaunchWithId = (launchId) =>{
    return launches.has(launchId);
}

export const deleteLaunch = (launchId) =>{
     const launch = launches.get(launchId);
     launch.success = false;
     launch.upcoming = false;
     return launch;
}
export const addNewLaunch = (launch) =>{
     latestFlightNumber++;
     launches.set(latestFlightNumber,Object.assign(launch,{
          flightNumber:latestFlightNumber,
          customers:['ZTM','HYE-VSM'],
          upcoming:true,
          success:true 
     }));
}

export const getAllLaunches = () =>{
     return Array.from(launches.values());
}



