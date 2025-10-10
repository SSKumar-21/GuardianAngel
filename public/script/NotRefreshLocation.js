let locationInterval;
const userID = document.querySelector('#recordBtn').alt;

document.querySelector('#recordBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  if (locationInterval) clearInterval(locationInterval);
  sendLocation('true',userID);
  locationInterval = setInterval(() => {
    sendLocation('true',userID);
  }, 10000);

  
});

document.querySelector("#stopBtn").addEventListener('click', (e) => {
  e.preventDefault();
 

  if (locationInterval) {
    clearInterval(locationInterval);
    locationInterval = null;
    console.log('Location tracking stopped.');
  }
  sendLocation('false',userID);
});



async function sendLocation(sat,ID) {
  console.log("Status" + sat);
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const info = {
              latitude: latitude,
              longitude: longitude,
              status: sat,
              userID: ID
          };

          try {
              const res = await fetch('/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(info)
              });

              if (!res.ok) throw new Error('Failed to send request.');

              const data = await res.json();
              console.log('Data sent successfully!');
          } catch (err) {
              console.error('Error:', err);
              console.log('Something went wrong!');
          }
      }, function(error) {
          console.error("Error getting location:", error.message);
      });
  } else {
      console.error("Geolocation is not supported by this browser.");
  }
}




