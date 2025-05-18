// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
// Feature jobs are loaded server-side in Django template
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function() {
    const searchQuery = document.getElementById('search-input').value.trim();
    const experienceLevel = document.getElementById('experience-select').value;
    
    if (searchQuery || experienceLevel) {
        searchJobs(searchQuery, experienceLevel);
    } else {
        alert('Please enter a search term or select experience level');
    }
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
});
// Function to search jobs based on keyword and experience
function searchJobs(query, experience) {
const jobCardsContainer = document.getElementById('job-cards-container');
// Show loading state
jobCardsContainer.innerHTML = '<p>Searching...</p>';

// Create the URL with query parameters
let searchUrl = '/search-jobs-ajax/';
let params = [];

if (query) {
    params.push(`query=${encodeURIComponent(query)}`);
}

if (experience) {
    params.push(`experience=${encodeURIComponent(experience)}`);
}

if (params.length > 0) {
    searchUrl += '?' + params.join('&');
}

// Make AJAX request to Django
fetch(searchUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        jobCardsContainer.innerHTML = '';
        
        if (data.jobs && data.jobs.length > 0) {
            data.jobs.forEach(job => {
                const jobCard = createJobCard(job);
                jobCardsContainer.appendChild(jobCard);
            });
        } else {
            jobCardsContainer.innerHTML = '<p class="no-jobs">No jobs found matching your search.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching jobs:', error);
        jobCardsContainer.innerHTML = '<p class="no-jobs">Error loading jobs. Please try again.</p>';
    });
}
// Function to create a job card element
function createJobCard(job) {
const jobCard = document.createElement('div');
jobCard.className = 'job-card';
jobCard.innerHTML = `
    <h3>${job.title}</h3>
    <div class="company-name">${job.company}</div>
    <div class="job-details">Experience: ${job.experience || 'Not specified'}</div>
    <div class="job-details">Salary: ${job.salary || 'Not specified'}</div>
    <div class="job-location">Job ID: ${job.id}</div>
    <a href="/job/${job.id}/" class="view-job-btn">View Details</a>
`;

return jobCard;
}