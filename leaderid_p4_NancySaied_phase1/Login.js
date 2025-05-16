const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (e) 
{
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value.trim();
    const errors = [];

    // Username validation
    if (!username) 
    {
        errors.push('Please enter your username');
    } 
    else if (username.length < 4) 
    {
        errors.push('Username must be at least 4 characters');
    }

    // Password validation
    if (!password) 
    {
        errors.push('Please enter your password');
    } 
    else 
    {
        if (password.length < 8) 
        {
            errors.push('Password must be at least 8 characters');
        }

        let hasUppercase = false;
        let hasLowercase = false;
        let hasNumber = false;

        for (let i = 0; i < password.length; i++) 
        {
            const char = password[i];
            if (char >= 'A' && char <= 'Z') 
            {   
                hasUppercase = true;
            }
            else if (char >= 'a' && char <= 'z') 
            {
                hasLowercase = true;
            }
            else if (char >= '0' && char <= '9') 
            { 
                hasNumber = true;
            }
        }

        if (!hasUppercase) 
        {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!hasLowercase) 
        {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (!hasNumber) 
        {
            errors.push('Password must contain at least one number');
        }
    }

    // if errors exist, show them
    if (errors.length > 0) 
    {
        alert(errors.join('\n'));
        return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(user => user.username === username && user.password === password && user.role === role);

    if (!matchedUser) {
        alert('Invalid username, password, or role');
        return;
    }

    alert('Login successful!');

    localStorage.setItem('username', username);
    
    // Redirect based on role
    if (role === 'user') {
        window.location.href = 'Home/home.html';
    } else {
        window.location.href = 'admin/Add.html';
    }

});