document.addEventListener("DOMContentLoaded", function () {
    const staticJobs = [
        {
            id: "J1001",
            title: "Frontend Developer",
            salary: "50000",
            company: "Tech Corp",
            status: "open"
        },
        {
            id: "J1002",
            title: "Backend Developer",
            salary: "60000",
            company: "Data Systems",
            status: "open"
        },
        {
            id: "J1003",
            title: "UI/UX Designer",
            salary: "45000",
            company: "Creative Labs",
            status: "close"
        }
    ];

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const applications = (JSON.parse(localStorage.getItem("jobAdmin")) || []);

    staticJobs.forEach(staticJob => {
        const exists = jobs.some(existingJob => existingJob.id === staticJob.id);
        if (!exists) {
            jobs.push(staticJob);
        }
    });

    jobs = Array.from(new Map(jobs.map(job => [job.id, job])).values());

    localStorage.setItem("jobs", JSON.stringify(jobs));

    const jobTitleContainer = document.getElementById("jobListContainer");
    const jobItemContainer = document.getElementById("jobDetailContainer");

    if (!jobTitleContainer || !jobItemContainer) {
        return;
    }

    if (jobs.length === 0) {
        jobTitleContainer.innerHTML = "<p>No jobs available</p>";
        return;
    }

    jobTitleContainer.innerHTML = "";
    jobs.forEach(job => {
        const jobItem = document.createElement("div");
        jobItem.className = "job-item";
        jobItem.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-meta">${job.salary}</div>
        `;

        jobItem.addEventListener("click", function () {
            document.querySelectorAll(".job-item").forEach(item => {
                item.classList.remove("selected");
            });

            this.classList.add("selected");

            let applyButtonHTML = "";
            if (job.status === "open") {
                applyButtonHTML = `<button class="apply-btn">Apply Now</button>`;
            } else {
                applyButtonHTML = `<p style="color: red;">Applications are closed for this job.</p>`;
            }

            jobItemContainer.innerHTML = `
                <h2>${job.title}</h2>
                <p><strong>Job ID:</strong> ${job.id}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Status:</strong> ${job.status}</p>
                ${applyButtonHTML}
            `;

            const applyButton = jobItemContainer.querySelector(".apply-btn");
            if (applyButton) {
                applyButton.addEventListener("click", function () {
                    const date = new Date();
                    const applicationDate = date.toISOString().split("T")[0];

                    let applications = JSON.parse(localStorage.getItem("applications")) || [];

                    const hasApplied = applications.some(app => app.title === job.title && app.company === job.company);
                    if (hasApplied) {
                        alert("You have already applied for this job!");
                        return;
                    }

                    const application = {
                        title: job.title,
                        company: job.company,
                        date: applicationDate
                    };

                    applications.push(application);
                    localStorage.setItem("applications", JSON.stringify(applications));

                    alert("Application is submitted successfully!");
                });
            }
        });

        jobTitleContainer.appendChild(jobItem);

        // Auto-select the job if it matches the saved selectedJobId
        const selectedJobId = localStorage.getItem("selectedJobId");
        if (selectedJobId && selectedJobId === job.id) {
            setTimeout(() => {
                jobItem.click();
                localStorage.removeItem("selectedJobId"); //clear it after selecting
            }, 100); // small delay to ensure page is ready
        }
    });
    applications.forEach(app => {
        const jobItem = document.createElement("div");
        jobItem.className = "job-item";
        jobItem.innerHTML = `
            <div class="job-title">${app.title}</div>
            <div class="job-company">${app.company}</div>
            <div class="job-meta">${app.salary}</div>
        `;

        jobItem.addEventListener("click", function () {
            document.querySelectorAll(".job-item").forEach(item => {
                item.classList.remove("selected");
            });

            this.classList.add("selected");

            let applyButtonHTML = "";
            if (app.status === "open") {
                applyButtonHTML = `<button class="apply-btn">Apply Now</button>`;
            } else {
                applyButtonHTML = `<p style="color: red;">Applications are closed for this job.</p>`;
            }

            jobItemContainer.innerHTML = `
                <h2>${app.title}</h2>
                <p><strong>Job ID:</strong> ${app.id}</p>
                <p><strong>Salary:</strong> ${app.salary}</p>
                <p><strong>Company:</strong> ${app.company}</p>
                <p><strong>Status:</strong> ${app.status}</p>
                ${applyButtonHTML}
            `;

            const applyButton = jobItemContainer.querySelector(".apply-btn");
            if (applyButton) {
                applyButton.addEventListener("click", function () {
                    const date = new Date();
                    const applicationDate = date.toISOString().split("T")[0];

                    let applications = JSON.parse(localStorage.getItem("applications")) || [];

                    const hasApplied = applications.some(app => app.title === app.title && app.company === app.company);
                    if (hasApplied) {
                        alert("You have already applied for this job!");
                        return;
                    }

                    const application = {
                        title: app.title,
                        company: app.company,
                        date: applicationDate
                    };

                    applications.push(application);
                    localStorage.setItem("applications", JSON.stringify(applications));

                    alert("Application is submitted successfully!");
                });
            }
        });

        jobTitleContainer.appendChild(jobItem);

        // Auto-select the job if it matches the saved selectedJobId
        const selectedJobId = localStorage.getItem("selectedJobId");
        if (selectedJobId && selectedJobId === job.id) {
            setTimeout(() => {
                jobItem.click();
                localStorage.removeItem("selectedJobId"); //clear it after selecting
            }, 100); // small delay to ensure page is ready
        }
    });
});
