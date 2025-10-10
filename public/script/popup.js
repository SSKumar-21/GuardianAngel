document.getElementById("showAboutBtn").addEventListener("click", function () {
    // Create modal wrapper
    const modal = document.createElement("div");
    modal.id = "customPopup";
    modal.style.position = "fixed";
    modal.style.top = "5%";
    modal.style.left = "5%";
    modal.style.width = "90%";
    modal.style.maxHeight = "90%"; // Set max height
    modal.style.zIndex = "1000";
    modal.style.color = "#fff";
    modal.style.backgroundColor = "#1e1e11";
    modal.style.border = "2px solid #333";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
    modal.style.padding = "20px";
    modal.style.overflowY = "auto"; // Enable vertical scrolling
    modal.style.lineHeight = "2.0";  // Adjust as needed
    modal.style.fontSize = "0.8rem";
  
    // Add your content
    modal.innerHTML = `
    <h2>About Guardian Angel</h2>
    <p>Welcome to the Emergency Helpline App – your 24x7 safety companion. This app is designed to provide instant support during emergencies, ensuring help is just a tap away.</p>
    
    <ol>
      <li>
        <strong>Emergency Call</strong>
        <p>Connect directly to nearby police or official helpline numbers with one tap.</p>
      </li>
    
      <li>
        <strong>Live Chat Support</strong>
        <p>Receive real-time assistance from our dedicated emergency response team.</p>
      </li>
    
      <li>
        <strong>Location Tracking</strong>
        <p>Instantly share your real-time location with trusted authorities to get timely help.</p>
      </li>
    
      <li>
        <strong>Smart Chatbot Assistance</strong>
        <p>Our intelligent chatbot is trained to support women in distress with accurate and empathetic guidance during emergencies.</p>
      </li>
    
      <li>
        <strong>Multi-Language Support</strong>
        <p>Breaking language barriers – the app supports multiple languages so that everyone can access help effortlessly.</p>
      </li>
    
      <li>
        <strong>Our Mission</strong>
        <p>We aim to create a secure and responsive environment for women and individuals in distress by combining technology with empathy and care.</p>
      </li>
    </ol>
    
    <div style="text-align:center; margin-top:20px; bottom:0; background:#1e1e11; padding-top:10px;">
      <button id="okBtnPopup" style="padding: 8px 20px; background: linear-gradient(to bottom right, #a9271b, #000000); color: #FFFFFF; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
        OK
      </button>
    </div>
    
    `;
  
    // Append to body
    document.body.appendChild(modal);
  
    // Handle OK button
    document.getElementById("okBtnPopup").addEventListener("click", function () {
      modal.remove();
    });
  });


  





  document.getElementById("showTermBtn").addEventListener("click", function () {
    // Create modal wrapper
    const modal = document.createElement("div");
    modal.id = "customPopup";
    modal.style.position = "fixed";
    modal.style.top = "5%";
    modal.style.left = "5%";
    modal.style.width = "90%";
    modal.style.maxHeight = "90%"; // Set max height
    modal.style.zIndex = "1000";
    modal.style.color = "#fff";
    modal.style.backgroundColor = "#1e1e11";
    modal.style.border = "2px solid #333";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
    modal.style.padding = "20px";
    modal.style.overflowY = "auto"; // Enable vertical scrolling
    modal.style.lineHeight = "2.0";  // Adjust as needed
    modal.style.fontSize = "0.8rem";

  
    // Add your content
    modal.innerHTML = `
      <h2>Welcome to our Guardian Angel!</h2>
      <p>Your safety is our top priority. Before using our app, please read the following terms:</p>
      
      <ol>
        <li>
          <strong>Purpose of the App</strong>
          <p>This app is designed to help users connect quickly with emergency services and trusted contacts in unsafe situations.</p>
        </li>
      
        <li>
          <strong>Data Collection</strong>
          <p>With your permission, we collect your:</p>
          <ul>
            <li>Location (real-time)</li>
            <li>Emergency contact details</li>
            <li>Chat history (only stored locally or anonymously)</li>
          </ul>
          <p>We do not sell or misuse your data. It's used only to enhance your safety features.</p>
        </li>
      
        <li>
          <strong>Location Sharing</strong>
          <p>You must enable GPS/location access for features like live tracking and nearby police alert to function properly.</p>
        </li>
      
        <li>
          <strong>Emergency Services Disclaimer</strong>
          <p>While we strive to connect you with the nearest police station, we do not guarantee response times of third-party emergency services.</p>
        </li>
      
        <li>
          <strong>Chatbot & Video Features</strong>
          <p>These tools are for additional support only and do not replace professional or legal assistance in emergencies.</p>
        </li>
      
        <li>
          <strong>User Responsibility</strong>
          <ul>
            <li>Do not misuse the emergency features.</li>
            <li>Add only verified and trusted contacts.</li>
            <li>Keep the app updated for full functionality.</li>
          </ul>
        </li>
      
        <li>
          <strong>App Limitations</strong>
          <p>This app cannot function without internet/GPS. It may not work properly in low-signal or restricted environments.</p>
        </li>
      
        <li>
          <strong>Changes to Terms</strong>
          <p>We may update these terms. You’ll be notified in-app when changes are made.</p>
        </li>
      
        <li>
          <strong>Legal Action for Misuse</strong>
          <ul>
          To ensure this platform remains safe and trustworthy:
          <li>False Alarms / Prank SOS: Triggering fake emergency alerts will result in account suspension and may be reported to authorities under applicable laws (e.g., filing false reports to police).</li>
          <li>Providing Wrong Information: Entering fake emergency contacts, misleading details, or impersonating others may lead to permanent ban from the app and potential legal consequences.</li>
          <li>Harassment & Abuse: Any misuse of chat, video, or reporting features for harassment will be strictly dealt with and may result in police involvement.</li>
          </ul>
        </li>

        <li>
          <strong>Final Note</strong>
          <p>By using this app, you agree to the above terms. Stay safe, stay strong.</p>
        </li>
      </ol>
  
      <div style="text-align:center; margin-top:20px; bottom:0; background:#1e1e11; padding-top:10px;">
        <button id="okBtnPopup" style="padding: 8px 20px; background: linear-gradient(to bottom right, #a9271b, #000000);color: #FFFFFF; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">OK</button>
      </div>
    `;
  
    // Append to body
    document.body.appendChild(modal);
  
    // Handle OK button
    document.getElementById("okBtnPopup").addEventListener("click", function () {
      modal.remove();
    });
  });
  


