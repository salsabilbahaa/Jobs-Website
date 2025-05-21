document.addEventListener("DOMContentLoaded", function () {
    const jobTitleContainer = document.getElementById("jobListContainer");
    const jobItemContainer = document.getElementById("jobDetailContainer");

    if (!jobTitleContainer || !jobItemContainer) return;

    // Add click handlers to job items
    document.querySelectorAll(".job-item").forEach(jobItem => {
        jobItem.addEventListener("click", function () {
            const jobId = this.dataset.jobId;
            
            // Highlight selected item
            document.querySelectorAll(".job-item").forEach(item => {
                item.classList.remove("selected");
            });
            this.classList.add("selected");
            
            // Fetch job details via AJAX
            fetch(`/jobs/ajax/job/${jobId}/`, {  // Construct URL directly
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(job => {
                renderJobDetails(job);
            })
            .catch(error => {
                console.error('Error:', error);
                jobItemContainer.innerHTML = `<p>Error loading job details</p>`;
            });
        });
    });

    function renderJobDetails(job) {
        let applyButtonHTML = "";
        if (job.status === "open") {
            applyButtonHTML = `<button class="apply-btn" data-job-id="${job.job_id}">Apply Now</button>`;
        } else {
            applyButtonHTML = `<p style="color: red;">Applications are closed for this job.</p>`;
        }

        jobItemContainer.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Job ID:</strong> ${job.job_id}</p>
            <p><strong>Salary:</strong> $${job.salary}</p>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Status:</strong> ${job.status}</p>
            ${applyButtonHTML}
        `;

        // Add event listener to apply button if it exists
        const applyButton = jobItemContainer.querySelector(".apply-btn");
        if (applyButton) {
            applyButton.addEventListener("click", function() {
                applyForJob(job.job_id);
            });
        }
    }

    function applyForJob(jobId) {
        fetch(`/jobs/apply/${jobId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.message);
                // Optional: Update UI to reflect application
                document.querySelector(`.job-item[data-job-id="${jobId}"]`)
                    .classList.add('applied');
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while applying for the job.');
        });
    }

    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});