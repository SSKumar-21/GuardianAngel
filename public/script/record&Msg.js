let mediaRecorder;
    let audioChunks = [];

    const recordBtn = document.getElementById("recordBtn");
    const stopBtn = document.getElementById("stopBtn");

    // ✅ Start button logic
    recordBtn.addEventListener("click", async () => {
      recordBtn.style.display = "none"; // hide record button

      // 1️⃣ Share live tracking location
      Loc_Share();

      // 2️⃣ Start audio recording
      await Start_Stop_Recording();

      // 3️⃣ Open emergency dial pad
      OpenDialPad();
    });


    // 📍 Share live location via WhatsApp
    async function Loc_Share() {
      try {
        const userID = recordBtn.alt || "unknown_user";
        const mapsLink = `https://livetrackingguardianangel.onrender.com/${userID}`;
        const message = `🚨 I am in danger!\n🔴 Live Tracking:\n${mapsLink}`;

        // Open WhatsApp with prefilled message
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

        console.log("Location shared via WhatsApp.");
      } catch (err) {
        console.error("Unable to fetch location:", err);
      }
    }


    // 🎙️ Handle audio recording start/stop
    async function Start_Stop_Recording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const audioURL = URL.createObjectURL(audioBlob);
          const a = document.createElement("a");
          a.href = audioURL;
          a.download = "Guardian.webm";
          document.body.appendChild(a);
          a.click();
          a.remove();

          stopBtn.style.display = "none"; // hide stop button
          recordBtn.style.display = "inline"; // show record button again
        };

        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.style.display = "inline";
        console.log("Recording started...");
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }


    // 📞 Open dial pad
    function OpenDialPad() {
      setTimeout(()=>{
      alert("Preparing your Call...");
      window.open("tel:112");
    },5000);
  }


    // ⏹️ Stop button logic
    stopBtn.addEventListener("click", () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        recordBtn.disabled = false;
        console.log("Recording stopped.");
      }
    });