window.onload = function () {
   
    if (!/iPhone|Android/i.test(navigator.userAgent)) {
        alert("This website is only accessible on smartphones.");
        document.body.innerHTML = ""; // Clear the page content
    }
};
