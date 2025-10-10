// Event listener for menu items
document.addEventListener("DOMContentLoaded", function () {
    const accountBtn = document.getElementById("accountBtn");
    if (accountBtn) {
        accountBtn.addEventListener("click", function () {
            switchPage("settings");
        });
    }

    const trustedContactBtn = document.getElementById("trustedContactBtn");
    if (trustedContactBtn) {
        trustedContactBtn.addEventListener("click", function () {
            switchPage("trustedcontact");
        });
    }

    const personalInfoBtn = document.getElementById("personalInfoBtn");
    if (personalInfoBtn) {
        personalInfoBtn.addEventListener("click", function () {
            switchPage("personalinfo");
        });
    }

    // ✅ Add this for user icon in header
    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
        userIcon.addEventListener("click", function () {
            switchPage("personalinfo");
        });
    }
});

document.getElementById("Call").addEventListener("click",()=>{
    window.location.href = "tel:112";
})