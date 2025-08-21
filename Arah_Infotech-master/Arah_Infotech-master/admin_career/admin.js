// // admin.js

// const jobForm = document.getElementById("jobForm");
// const jobList = document.getElementById("jobList");

// function loadJobs() {
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobList.innerHTML = "";
//   jobs.forEach((job, index) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<strong>${job.title}</strong> - ${job.location} 
//       <button class="btn btn-sm btn-danger" onclick="deleteJob(${index})">Remove</button>`;
//     jobList.appendChild(li);
//   });
// }

// function deleteJob(index) {
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobs.splice(index, 1);
//   localStorage.setItem("jobs", JSON.stringify(jobs));
//   loadJobs();
// }

// jobForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const job = {
//     title: document.getElementById("title").value,
//     description: document.getElementById("description").value,
//     location: document.getElementById("location").value,
//   };
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobs.push(job);
//   localStorage.setItem("jobs", JSON.stringify(jobs));
//   loadJobs();
//   jobForm.reset();
// });

// loadJobs();



// const jobForm = document.getElementById("jobForm");
// const jobList = document.getElementById("jobList");

// function loadJobs() {
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobList.innerHTML = "";
//   jobs.forEach((job, i) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<b>${job.title}</b> - ${job.location} 
//       <button onclick="deleteJob(${i})">Remove</button>`;
//     jobList.appendChild(li);
//   });
// }
// function deleteJob(index) {
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobs.splice(index, 1);
//   localStorage.setItem("jobs", JSON.stringify(jobs));
//   loadJobs();
// }
// jobForm.addEventListener("submit", e => {
//   e.preventDefault();
//   const job = {
//   title: document.getElementById("title").value,
//   location: document.getElementById("location").value,
//   experience: document.getElementById("experience").value,
//   skills: document.getElementById("skills").value,
//   job_description: document.getElementById("job_description").value
// };
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   jobs.push(job);
//   localStorage.setItem("jobs", JSON.stringify(jobs));
//   jobForm.reset();
//   loadJobs();
// });
// loadJobs();



const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

let editIndex = -1; // -1 means we're not editing

function loadJobs() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobList.innerHTML = "";
  const noJobsMessage = document.getElementById("noJobsMessage");

  if (jobs.length === 0) {
    noJobsMessage.style.display = "block";
    return; // no jobs to render
  } else {
    noJobsMessage.style.display = "none";
  }
  jobs.forEach((job, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${job.title}</b> - ${job.location} 
      <button onclick="editJob(${i})">Edit</button>
      <button onclick="deleteJob(${i})">Remove</button>`;
    jobList.appendChild(li);
  });
}

function deleteJob(index) {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  loadJobs();
}

function editJob(index) {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs[index];
  document.getElementById("title").value = job.title;
  document.getElementById("location").value = job.location;
  document.getElementById("experience").value = job.experience;
  document.getElementById("skills").value = job.skills;
  document.getElementById("job_description").value = job.job_description;
  editIndex = index;
}

jobForm.addEventListener("submit", e => {
  e.preventDefault();
  const job = {
    title: document.getElementById("title").value,
    location: document.getElementById("location").value,
    experience: document.getElementById("experience").value,
    skills: document.getElementById("skills").value,
    job_description: document.getElementById("job_description").value
  };

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  if (editIndex === -1) {
    // Add new job
    jobs.push(job);
  } else {
    // Update existing job
    jobs[editIndex] = job;
    editIndex = -1; // reset edit mode
  }

  localStorage.setItem("jobs", JSON.stringify(jobs));
  jobForm.reset();
  loadJobs();
});

loadJobs();
