document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");
  
    profileForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Retrieve form data
      const formData = new FormData(profileForm);
      const profileData = {};
      formData.forEach((value, key) => {
        profileData[key] = value;
      });
  
      // Store data in localStorage
      localStorage.setItem("headmasterProfile", JSON.stringify(profileData));
  
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    });
  });
  