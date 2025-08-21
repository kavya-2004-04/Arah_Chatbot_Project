// // career.js
// import { db } from "./firebase-config.js";
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// const jobContainer = document.getElementById("jobContainer");

// async function loadJobs() {
//   const querySnapshot = await getDocs(collection(db, "jobs"));
//   jobContainer.innerHTML = "";
//   querySnapshot.forEach((doc) => {
//     const job = doc.data();
//     jobContainer.innerHTML += `
//       <div class="job-card bg-white p-6 rounded-xl shadow-md">
//         <h2 class="text-2xl font-semibold text-gray-800">${job.title}</h2>
//         <p><strong>Experience:</strong> ${job.experience}</p>
//         <p><strong>Skills:</strong> ${job.skills}</p>
//         <p><strong>Location:</strong> ${job.location}</p>
//         <button onclick="toggleForm(this, '${job.title}')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
//       </div>
//     `;
//   });
// }

// loadJobs();

// const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
// const container = document.getElementById("jobsContainer");

// jobs.forEach(job => {
//   const div = document.createElement("div");
//   div.className = "job-card";
//   div.innerHTML = `
//     <h2 class="text-2xl font-semibold text-gray-800">${job.title}</h2>
//     <p><strong>Experience:</strong> ${job.experience}</p>
//     <p><strong>Skills:</strong> ${job.skills}</p>
//     <p><strong>Location:</strong> ${job.location}</p>
//     <button onclick="toggleForm(this, '${job.title}')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
//   `;
//   container.appendChild(div);
// });


const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
const container = document.getElementById("jobContainer");
const noJobsMessage = document.getElementById("noJobsMessage");


if (jobs.length === 0) {
  noJobsMessage.style.display = "block";
} else {
  noJobsMessage.style.display = "none"; // Hide the message
}
jobs.forEach(job => {
  const div = document.createElement("div");
  div.className = "job-card bg-white p-6 rounded-xl shadow-md";
  div.setAttribute("data-title", job.title);

  div.innerHTML = `
    <h2 class="text-2xl font-semibold text-gray-800">${job.title}</h2>
    <p><strong>Experience:</strong> ${job.experience}</p>
    <p><strong>Skills:</strong> ${job.skills}</p>
    </br>
    <p><strong>Job Description:</strong> ${job.job_description}</p>
    </br>
    <p><strong>Location:</strong> ${job.location}</p>
    <button onclick="toggleForm(this, '${job.title}')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
  `;

  container.appendChild(div);
});
