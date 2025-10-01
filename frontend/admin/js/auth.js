// Handle logout functionality
function handleLogout() {
    const isConfirmed = confirm('Are you sure you want to log out?');
    if (isConfirmed) {
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logoutButton');

    // Add click event for logout button if it exists
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleLogout();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const res = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });
                const data = await res.json();
                if (res.ok && data.token) {
                    localStorage.setItem('adminToken', data.token);
                    // Also set session flag for legacy frontend checks
                    sessionStorage.setItem('isAdminLoggedIn', 'true');
                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 100);
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (err) {
                alert('Login error: ' + err.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            try {
                const res = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });
                const data = await res.json();
                if (res.ok && data.id) {
                    alert('Registration successful! Redirecting to login page...');
                    window.location.href = 'login.html';
                } else {
                    alert(data.error || 'Registration failed');
                }
            } catch (err) {
                alert('Registration error: ' + err.message);
            }
        });
    }
});
