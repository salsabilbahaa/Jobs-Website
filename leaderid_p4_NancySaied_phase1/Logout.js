// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    const loginRegisterLink = document.getElementById('login-register-link');
    const logoutLink = document.getElementById('logout-link');
    
    if (username) {
        // User is logged in
        loginRegisterLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        // User is not logged in
        loginRegisterLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
    
    // Handle logout
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('username');

        loginRegisterLink.style.display = 'block';
        logoutLink.style.display = 'none';
        
        window.location.href = '#';
    });
});