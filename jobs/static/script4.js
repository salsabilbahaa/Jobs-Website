function deleteJob(jobId) {
    fetch(`/accounts/admin/delete-job/${jobId}/`, {
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
