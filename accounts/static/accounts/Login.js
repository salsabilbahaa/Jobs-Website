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
    if (errors.length > 0) 
    {
        alert(errors.join('\n'));
        return;
    }
    fetch('/accounts/login/', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: username,
        password: password,
        role: role
    })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message);
            if (data.role === "user") {
                window.location.href = "/";
            } else {
                window.location.href = "/accounts/admin/";
            }
        } else {
            alert(data.message); 
        }
   })
});