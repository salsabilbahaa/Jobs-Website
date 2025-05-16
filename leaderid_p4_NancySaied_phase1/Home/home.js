// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedJobs();
    
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function() {
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        if (searchQuery) {
            searchJobs(searchQuery);
        } else {
            alert('Please enter a search term');
        }
    });
    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});

// Function to load featured jobs
function loadFeaturedJobs() {
    const jobCardsContainer = document.getElementById('job-cards-container');
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
        jobs = createSampleJobs();
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }
    
    jobCardsContainer.innerHTML = '';
    
    const featuredJobs = jobs.filter(job => job.status.toLowerCase() === 'open' || job.status.toLowerCase() === 'opened');
    const jobsToDisplay = featuredJobs.slice(0, 3);
    
    if (jobsToDisplay.length > 0) {
        jobsToDisplay.forEach(job => {
            const jobCard = createJobCard(job);
            jobCardsContainer.appendChild(jobCard);
        });
    } else {
        jobCardsContainer.innerHTML = '<p class="no-jobs">No open jobs available at the moment.</p>';
    }
}

// Function to search jobs based on keyword
function searchJobs(query) {
    const jobCardsContainer = document.getElementById('job-cards-container');
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(query) || 
        (job.company && job.company.toLowerCase().includes(query))
    );

    jobCardsContainer.innerHTML = '';

    if (filteredJobs.length > 0) {
        filteredJobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobCardsContainer.appendChild(jobCard);
        });
    } else {
        jobCardsContainer.innerHTML = '<p class="no-jobs">No jobs found matching your search.</p>';
    }
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
        <a href="#" class="view-job-btn" data-id="${job.id}">View Details</a>
    `;
    
    // Add event listener to the View Details button
    const viewDetailsBtn = jobCard.querySelector('.view-job-btn');
    viewDetailsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const jobId = this.getAttribute('data-id');
        
        // Check if user is logged in before allowing to view job details
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Please login to view job details');
            window.location.href = '../Login.html';
            return;
        }

        // Store the selected job ID
        localStorage.setItem('selectedJobId', jobId);

        // Redirect to search_job.html
        window.location.href = '../search/search_job.html';
    });
    
    return jobCard;
}

// Function to redirect to the appropriate job details page (no longer used, but kept if needed for future)
function redirectToJobDetails(jobId) {
    const jobDetailsPages = {
        '54321': 'JobDetails1.html',
        '24680': 'JobDetails2.html',
        '15539': 'JobDetails3.html',
        '21903': 'JobDetails4.html'
    };
    
    if (jobDetailsPages[jobId]) {
        window.location.href = jobDetailsPages[jobId];
    } else {
        window.location.href = '../search/search_job.html';
    }
}

// Function to create sample jobs if none exist
function createSampleJobs() {
    return [
        {
            id: '54321',
            title: 'Data Engineer',
            company: 'SWATX',
            experience: '3+ years',
            salary: 'Not specified',
            status: 'open',
            description: 'Responsible for building and maintaining data pipelines and architectures. Work with large datasets and collaborate with data scientists to ensure the infrastructure supports data analysis.'
        },
        {
            id: '24680',
            title: 'Data Scientist',
            company: 'Employ Me',
            experience: '2+ years',
            salary: 'Not specified',
            status: 'open',
            description: 'Develop data-driven solutions using Natural Language Processing (NLP) techniques and analyze textual data.'
        },
        {
            id: '15539',
            title: 'Software Engineer',
            company: 'Activepieces',
            experience: '2+ years',
            salary: 'Depends on Experience',
            status: 'open',
            description: 'A Software Engineer is an IT professional who designs, develops and maintains computer software at a company. They use their creativity and technical skills and apply the principles of software engineering to help solve new and ongoing problems for an organization.'
        },
        {
            id: '21903',
            title: 'Networks Engineer',
            company: 'NetDefendX',
            experience: '3+ years',
            salary: 'Not specified',
            status: 'open',
            description: 'Designs, builds, and maintains computer networks for organizations. Which can be local area networks (LANs), wide area networks (WANs), internet connections, and intranets. The job involves setting up hardware like routers and switches, ensuring network security, troubleshooting issues, and making sure the network runs smoothly and efficiently.'
        }
    ];
}
