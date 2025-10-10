document.getElementById("logoutBtn").addEventListener("click",()=>{
    document.querySelector("body").innerHTML = `
    <div class="body">
  <div class="logout-wrapper">
    
    

    <img src="media/padlock.png" alt="Lock" class="logout-image">

    <span class="logout-text">You've Logged Out Safely</span >
    <span class="logout-note">We're always here when you need us.</span>
    <span class="logout-safe">Stay Safe</span >

    <form action="/" method="get">
      <button type="submit" class="logout-button" id="logout_btn">Login Again</button>
    </form>

  </div>
</div>
    `
})