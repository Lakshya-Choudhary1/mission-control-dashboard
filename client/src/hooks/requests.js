const API_URL = 'http://localhost:5000' ;
async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber - b.flightNumber;
  }) ;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try{
    return  await fetch(`${API_URL}/launches`,{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(launch)
    })
  }catch(err){
    return {
      ok:false
    }
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
    method:'delete',
    })
  }catch{
    return {
      ok:false,
    }
  }
  

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};