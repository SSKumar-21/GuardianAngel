function handleMapLoad() {
  const status = document.getElementById("status");
  const mapDiv = document.getElementById("map");
  const locShareBtn = document.getElementById("locShare");

  // ✅ Common function to get location (returns a Promise)
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }),
        (err) => reject(err)
      );
    });
  }

  // ✅ Update Google Map inside <div>
  async function updateMap() {
    status.style.display = "block";
    status.textContent = "Fetching your location...";

    try {
      const { lat, lng } = await getCurrentLocation();
      const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

      mapDiv.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          style="border:0;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${googleMapsEmbedUrl}">
        </iframe>`;

      status.style.display = "none";
    } catch (err) {
      status.style.display = "block";
      status.textContent = "Error fetching location: " + err.message;
    }
  }

  // ✅ Send WhatsApp message with location link
  async function shareLocation() {
    try {
      const { lat, lng } = await getCurrentLocation();
      const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
      const message = `This is my current location. It is unsafe here, so I'm letting you know:\n${mapsLink}`;

      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    } catch (err) {
      console.error("Unable to fetch location:", err.message);
      alert("Unable to fetch location. Please enable location services.");
    }
  }

  // ✅ Initial load + periodic updates
  updateMap();
  setInterval(updateMap, 15000);

  // ✅ Button event listener
  locShareBtn.addEventListener("click", shareLocation);
}
