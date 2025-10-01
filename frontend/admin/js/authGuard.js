// This script checks if the user is logged in. If not, it redirects to the login page.

(function () {
    const token = localStorage.getItem('adminToken');
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    // Allow access if we have either a token or the legacy session flag
    if (!token && !isLoggedIn && currentPage !== 'login.html' && currentPage !== 'register.html') {
        window.location.href = 'login.html';
    }
})();
