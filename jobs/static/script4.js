function deleteJob(jobId) {
    fetch(`/admin-jobs/delete-job/${jobId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken(), 
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const jobElement = document.querySelector(`#job-${jobId}`);
            if (jobElement) {
                jobElement.remove();
            }
            alert('Job deleted successfully');
        } else {
            alert('Failed to delete job');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong');
    });
}

function getCSRFToken() {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
    if (cookie) {
        return cookie.split('=')[1];
    }
    return '';
}

function setupSearchFilter() {
    const searchInput = document.querySelector('.filters input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const filterText = e.target.value;

        fetch(`/jobs/search/?q=${encodeURIComponent(filterText)}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest' 
            }
        })
        .then(response => response.json()) 
        .then(data => {
            displayJobs(data.jobs);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

function displayJobs(jobs) {
    const jobsContainer = document.querySelector('#jobs-container');
    if (!jobsContainer) return;

    jobsContainer.innerHTML = '';  

    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p>No jobs found.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job';
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Salary: ${job.salary}</p>
            <p>Status: ${job.status}</p>
        `;
        jobsContainer.appendChild(jobElement);
    });
}
