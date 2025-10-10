const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const sendCodeBtn = document.getElementById("sendCodeBtn");

// OTP auto-focus (forward, backward & restrict to 1 char)
const otpInputs = document.querySelectorAll(".otp_container input");

otpInputs.forEach((input, index) => {
  // Restrict to 1 character
  input.addEventListener("input", (e) => {
    let value = e.target.value;

    // If user pastes multiple chars, take only the first
    if (value.length > 1) {
      const chars = value.split("");
      e.target.value = chars[0]; // keep first char

      // Fill the rest of inputs automatically
      for (let i = 1; i < chars.length && index + i < otpInputs.length; i++) {
        otpInputs[index + i].value = chars[i];
      }

      // Move focus to last filled input
      const nextIndex = Math.min(index + chars.length, otpInputs.length - 1);
      otpInputs[nextIndex].focus();
    } else {
      // Normal typing → move to next box
      e.target.value = value.replace(/[^0-9a-zA-Z]/g, ""); // allow only alphanum
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    }
  });

  // Handle Backspace/Delete → go back
  input.addEventListener("keydown", (e) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});
