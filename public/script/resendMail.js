document.addEventListener("DOMContentLoaded", () => {
    const resendLink = document.querySelector(".resend a");
  
    if (resendLink) {
      resendLink.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Disable immediately after click
        disableResend();
  
        // Save timer start
        localStorage.setItem("otpTimerStart", Date.now());
  
        // Refresh page to request new OTP
        window.location.reload();
      });
    }
  
    // Create timer element
    const timerContainer = document.createElement("p");
    timerContainer.classList.add("timer");
    const resendContainer = document.querySelector(".resend");
    resendContainer.insertAdjacentElement("afterend", timerContainer);
  
    function startTimer(duration) {
      let endTime = Date.now() + duration;
  
      function updateTimer() {
        let remaining = endTime - Date.now();
        if (remaining <= 0) {
          timerContainer.textContent = "You can now resend the code.";
          enableResend();
          localStorage.removeItem("otpTimerStart");
          return;
        }
  
        let minutes = Math.floor((remaining / 1000) / 60);
        let seconds = Math.floor((remaining / 1000) % 60);
  
        timerContainer.textContent = `Resend available in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        requestAnimationFrame(updateTimer);
      }
  
      updateTimer();
    }
  
    // Disable resend
    function disableResend() {
      resendLink.style.pointerEvents = "none"; // disable click
      resendLink.style.opacity = "0.5";       // fade look
    }
  
    // Enable resend
    function enableResend() {
      resendLink.style.pointerEvents = "auto";
      resendLink.style.opacity = "1";
    }
  
    // Restore timer if still running
    const savedStart = localStorage.getItem("otpTimerStart");
    if (savedStart) {
      let elapsed = Date.now() - parseInt(savedStart, 10);
      let remaining = 2 * 60 * 1000 - elapsed; // 2 minutes
      if (remaining > 0) {
        disableResend();
        startTimer(remaining);
      } else {
        enableResend();
        localStorage.removeItem("otpTimerStart");
      }
    }
  });
  