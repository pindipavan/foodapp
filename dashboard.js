document.addEventListener("DOMContentLoaded", () => {
    const profileData = JSON.parse(localStorage.getItem("headmasterProfile"));
    if (!profileData) {
      window.location.href = "index.html";
    } else {
      document.getElementById("userNameTitle").innerText = profileData.fullName;
      document.getElementById("profileImage").src = profileData.profilePicture || "default-profile-icon.png";
      document.getElementById("fullNameDisplay").innerText = `Full Name: ${profileData.fullName}`;
      document.getElementById("emailDisplay").innerText = `Email: ${profileData.email}`;
      document.getElementById("phoneDisplay").innerText = `Phone: ${profileData.phone}`;
      document.getElementById("schoolNameDisplay").innerText = `School Name: ${profileData.schoolName}`;
      document.getElementById("schoolAddressDisplay").innerText = `School Address: ${profileData.schoolAddress}`;
    }
  
    const profileButton = document.getElementById("profileButton");
    const profileInfo = document.getElementById("profileInfo");
  
    profileButton.addEventListener("click", () => {
      profileInfo.style.display = profileInfo.style.display === "none" ? "block" : "none";
    });
  
    const notificationButton = document.getElementById("notificationButton");
    const notificationList = document.getElementById("notificationList");
  
    notificationButton.addEventListener("click", () => {
      notificationList.style.display = notificationList.style.display === "none" ? "block" : "none";
    });
  
    const jobForm = document.getElementById("jobForm");
    const jobPosts = document.getElementById("jobPosts");
  
    jobForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const jobTitle = document.getElementById("jobTitle").value;
      const jobDescription = document.getElementById("jobDescription").value;
      addJobPost(jobTitle, jobDescription);
      jobForm.reset();
    });
  
    function addJobPost(title, description) {
      const jobPost = {
        title,
        description,
        id: Date.now()
      };
  
      const jobPostsData = JSON.parse(localStorage.getItem("jobPosts")) || [];
      jobPostsData.push(jobPost);
      localStorage.setItem("jobPosts", JSON.stringify(jobPostsData));
      displayJobPosts();
    }
  
    function removeJobPost(id) {
      let jobPostsData = JSON.parse(localStorage.getItem("jobPosts")) || [];
      jobPostsData = jobPostsData.filter(job => job.id !== id);
      localStorage.setItem("jobPosts", JSON.stringify(jobPostsData));
      displayJobPosts();
    }
  
    function displayJobPosts() {
      const jobPostsData = JSON.parse(localStorage.getItem("jobPosts")) || [];
      jobPosts.innerHTML = "";
      if (jobPostsData.length > 0) {
        jobPostsData.forEach(job => {
          const jobDiv = document.createElement("div");
          jobDiv.className = "job-post";
          jobDiv.innerHTML = `
            <div>
              <p><strong>Title:</strong> ${job.title}</p>
              <p><strong>Description:</strong> ${job.description}</p>
            </div>
            <button class="remove-button" data-id="${job.id}">Remove</button>
          `;
          jobPosts.appendChild(jobDiv);
        });
        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
          button.addEventListener("click", (event) => {
            const jobId = parseInt(event.target.getAttribute("data-id"));
            removeJobPost(jobId);
          });
        });
      } else {
        jobPosts.innerHTML = "<p>No job posts available.</p>";
      }
    }
  
    displayJobPosts();
  
    const facultyList = document.getElementById("facultyList");
    const facultyData = JSON.parse(localStorage.getItem("facultyData")) || [];
  
    if (facultyData.length > 0) {
      facultyData.forEach(faculty => {
        const facultyDiv = document.createElement("div");
        facultyDiv.className = "faculty-details";
        facultyDiv.innerHTML = `
          <p><strong>Name:</strong> ${faculty.name}</p>
          <p><strong>Department:</strong> ${faculty.department}</p>
          <p><strong>Email:</strong> ${faculty.email}</p>
          <p><strong>Phone:</strong> ${faculty.phone}</p>
          <p><strong>Specialization:</strong> ${faculty.specialization}</p>
        `;
        facultyList.appendChild(facultyDiv);
      });
    } else {
      facultyList.innerHTML = "<p>No faculty details available.</p>";
    }
  });
  