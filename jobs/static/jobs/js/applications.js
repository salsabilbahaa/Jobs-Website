// document.addEventListener("DOMContentLoaded", function () {
 
    
//     const applicationsContainer = document.getElementById("applicationsContainer");

  
//     if (!applicationsContainer) {
//         console.error("Applications container not found");
//         return;
//     }

   
//     const applications = (JSON.parse(localStorage.getItem("jobAdmin")) || []);
//      const app2 = (JSON.parse(localStorage.getItem("applications"))|| [])
//     if (applications.length === 0 && app2.length === 0) {
//         applicationsContainer.innerHTML = "<p>No applications submitted yet.</p>";
//         return;
//     }

   
//     applications.forEach(app => {
//         const appItem = document.createElement("div");
//         appItem.className = "application-item";
//         appItem.innerHTML = `
//             <div class="app-title">${app.title}</div>
//             <div class="app-details">${app.company} | Applied on: ${app.date}</div>
//         `;
//         applicationsContainer.appendChild(appItem);
//     });
//     app2.forEach(app => {
//         const appItem = document.createElement("div");
//         appItem.className = "application-item";
//         appItem.innerHTML = `
//             <div class="app-title">${app.title}</div>
//             <div class="app-details">${app.company} | Applied on: ${app.date}</div>
//         `;
//         applicationsContainer.appendChild(appItem);
//     });
// });