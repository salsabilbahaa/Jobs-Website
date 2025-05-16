document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
    setupJobForm();
    setupSearchFilter();
    setupEditPage();

    if (window.location.pathname.includes('job-details.html')) {
        setupJobDetailsPage();
    }
});

function initializeApp() {
    if (!localStorage.getItem('jobAdmin')) {
        const staticJobs = [
            { id: 1, title: "Data Engineer", status: "open", salary: "500$", company: "SWTX", detailsUrl: "job-details.html?id=1" },
            { id: 2, title: "Software Engineer", status: "open", salary: "350$", company: "EmployMe", detailsUrl: "job-details.html?id=2" },
            { id: 3, title: "Data Scientist", status: "closed", salary: "1000$", company: "ActivePieces", detailsUrl: "job-details.html?id=3" }
        ];
        localStorage.setItem('jobAdmin', JSON.stringify(staticJobs));
    }
    displayJobs();
}

function getAllJobs() {
    try {
        return JSON.parse(localStorage.getItem('jobAdmin')) || [];
    } catch (e) {
        console.error("Error parsing jobs data", e);
        return [];
    }
}

function saveJobs(jobs) {
    localStorage.setItem('jobAdmin', JSON.stringify(jobs));
}

function addJob(newJob) {
    const jobs = getAllJobs();
    newJob.detailsUrl = `job-details.html?id=${newJob.id}`;
    jobs.unshift(newJob);
    saveJobs(jobs);
    displayJobs();
}

function setupJobForm() {
    const form = document.querySelector(".form");
    if (!form) return;

    const idField = document.getElementById("id");
    const titleField = document.getElementById("tit");
    const salaryField = document.getElementById("num");
    const companyField = document.getElementById("name");
    const statusField = document.getElementById("stat");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        const job = {
            id: parseInt(idField.value.trim()),
            title: titleField.value.trim(),
            salary: salaryField.value.trim(),
            company: companyField.value.trim(),
            status: statusField.value
        };

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("id")) {
            updateJob(job);
        } else {
            addJob(job);
            alert("Job added successfully!");
        }

        form.reset();
    });

    function validateForm() {
        if (!idField.value || !titleField.value || !salaryField.value || !companyField.value || !statusField.value) {
            alert("Please fill all the fields!");
            return false;
        }
        
        const jobs = getAllJobs();
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get("id") && jobs.some(job => job.id === parseInt(idField.value))) {
            alert("Job ID already exists!");
            return false;
        }
        return true;
    }
}

function setupSearchFilter() {
    const searchInput = document.querySelector('.filters input');
    if (!searchInput) return;
    searchInput.addEventListener('input', function (e) {
        const filterText = e.target.value.toLowerCase();
        const jobs = getAllJobs();
        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(filterText) ||
            job.company.toLowerCase().includes(filterText)
        );
        displayJobs(filteredJobs);
    });
}

function editJob(updatedJob) {
    const jobs = getAllJobs();
    const index = jobs.findIndex(job => job.id === updatedJob.id);
    if (index !== -1) {
        jobs[index] = updatedJob;
        saveJobs(jobs);
        displayJobs();
        return true;
    }
    return false;
}

function updateJob(updatedJob) {
    const jobs = getAllJobs();
    const index = jobs.findIndex(job => job.id == updatedJob.id);
    if (index !== -1) {
        updatedJob.detailsUrl = `job-details.html?id=${updatedJob.id}`;
        jobs[index] = updatedJob;
        saveJobs(jobs);
        alert("Job updated successfully!");
        window.location.href = "page4.html";
    }
}

function displayJobs(jobsToRender = null) {
    const jobsContainer = document.getElementById('jobs');
    if (!jobsContainer) return;
    jobsContainer.innerHTML = '';
    const jobs = jobsToRender || getAllJobs();
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p>No jobs found</p>';
        return;
    }
    
    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'shape';
        jobElement.innerHTML = `
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="status ${job.status}">${job.status}</span>
            </div>
            <div class="job-details">
                <p><strong>Job ID:</strong> ${job.id}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Company name:</strong> ${job.company}</p>
            </div>
            <div class="job-actions">
                <a href="${job.detailsUrl}" class="bt btn-small">View details</a>
                <a href="#" class="bt btn-small edit" data-id="${job.id}">Edit</a>
                <a href="#" class="bt btn-small delete" data-id="${job.id}">Delete</a>
            </div>
        `;
        jobsContainer.appendChild(jobElement);
    });
    
    setupEditDeleteHandlers();
}

function deleteJob(jobId) {
    const jobs = getAllJobs().filter(job => job.id !== jobId);
    saveJobs(jobs);
    displayJobs();
}

function setupEditDeleteHandlers() {
    const listContainer = document.getElementById('jobs');
    if (!listContainer) return;

    listContainer.addEventListener('click', function (e) {
        const target = e.target;

        if (target.classList.contains('delete')) {
            e.preventDefault();
            const jobId = parseInt(target.dataset.id);
            if (confirm('Are you sure you want to delete this job?')) {
                deleteJob(jobId);
            }
        }

        if (target.classList.contains('edit')) {
            e.preventDefault();
            const jobId = parseInt(target.dataset.id);
            window.location.href = `Edit.html?id=${jobId}`;
        }
    });
}

function setupJobDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    const jobs = getAllJobs();
    const job = jobs.find(j => j.id == jobId);
    const jobDetailsElement = document.getElementById('jobDetails');

    if (!jobDetailsElement) return;

    if (job) {
        jobDetailsElement.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Job ID:</strong> ${job.id}</p>
            <p><strong>Status:</strong> ${job.status}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
        `;
    } else {
        jobDetailsElement.innerHTML = '<p>Job not found</p>';
    }
}

function setupEditPage() {
    if (!window.location.pathname.includes('Edit.html')) return;
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get("id"));
    const jobs = getAllJobs();
    const job = jobs.find(j => j.id === jobId);

    if (job) {
        document.getElementById("id").value = job.id;
        document.getElementById("tit").value = job.title;
        document.getElementById("num").value = job.salary;
        document.getElementById("name").value = job.company;
        document.getElementById("stat").value = job.status;
    }
}

if (window.location.pathname.includes('job-details.html')) {
    document.addEventListener('DOMContentLoaded', setupJobDetailsPage);
}
