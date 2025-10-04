(function () {
    const token = localStorage.getItem('adminToken');
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
if (!token && !isLoggedIn && currentPage !== 'login.html' && currentPage !== 'register.html') {
        window.location.href = 'login.html';
    }
})();
