const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");

recordBtn.addEventListener("click",()=>{
  event.preventDefault();
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  
  // patch request to database updating the co ordinates in every 10 sec
  // how to send it to backend ?
  
})

stopBtn.addEventListener("click",()=>{
  // send one 
  // stop send data in backend 
})


/*
liveTracking
latitude : 26.417261
longitude :80.4027722
status : false


status : false -> user is safe and true -> user is not safe
recordBtn.addEventListener("click",()=>{}) -> update the latitude and longitude in every 10 sec and status false

stopBtn.addEventListener("click",()=>{}) -> change the status to the true as the user is safe 

*/