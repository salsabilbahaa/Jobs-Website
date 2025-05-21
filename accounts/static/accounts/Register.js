const form = document.querySelector('.registerForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    const errors = [];

    // Email validation
    if (!email) {
        errors.push('Please enter your email');
    }

    // Username validation
    if (!username) {
        errors.push('Please enter your username');
    } else if (username.length < 4) {
        errors.push('Username must be at least 4 characters');
    }

    // Password validation
    if (!password) {
        errors.push('Please enter your password');
    } else {
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }

        let hasUppercase = false;
        let hasLowercase = false;
        let hasNumber = false;

        for (let i = 0; i < password.length; i++) {
            const char = password[i];
            if (char >= 'A' && char <= 'Z') {
                hasUppercase = true;
            } else if (char >= 'a' && char <= 'z') {
                hasLowercase = true;
            } else if (char >= '0' && char <= '9') {
                hasNumber = true;
            }
        }

        if (!hasUppercase) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!hasLowercase) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (!hasNumber) {
            errors.push('Password must contain at least one number');
        }
    }

    if (!confirmPassword) 
    {
        errors.push('Please enter your confirm password');
    }
    else if (confirmPassword != password) 
    {
        errors.push('Passwords do not match');
    }
    
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }
    fetch('/accounts/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        role: role
        })
        
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {
            alert('Registration successful!');
            if (data.role === 'admin') {
                window.location.href = '/accounts/admin/';
            } else {
                window.location.href = '/';
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
});

