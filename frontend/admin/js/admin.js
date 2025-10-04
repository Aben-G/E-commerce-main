
let salesChart = null;
let currentPeriod = 30; 


const API_BASE_URL = '/api';


const elements = {
    totalRevenue: document.getElementById('totalRevenue'),
    totalUsers: document.getElementById('totalUsers'),
    totalProducts: document.getElementById('totalProducts'),
    topProducts: document.getElementById('topProducts'),
    salesChart: document.getElementById('salesChart'),
    salesPeriod: document.getElementById('salesPeriod'),
    refreshBtn: document.getElementById('refreshDashboard'),
    lastUpdated: document.getElementById('lastUpdated')
};


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};

// Format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Update last updated time
const updateLastUpdated = () => {
    const now = new Date();
    elements.lastUpdated.textContent = now.toLocaleTimeString();
};

// Fetch dashboard data
const fetchDashboardData = async () => {
    try {
        // Show loading state for top products
        elements.topProducts.innerHTML = '<div class="loading">Loading top products...</div>';

        // Fetch all data in parallel
        const [stats, products] = await Promise.all([
            fetch(`${API_BASE_URL}/dashboard/stats`).then(res => res.json()),
            fetch(`${API_BASE_URL}/products/top?limit=5`).then(res => res.json())
        ]);

        // Update stats
        updateStats(stats);

        // Update top products with real data
        updateTopProducts(products);

        // Update chart with real data
        await updateSalesChart();

        // Update last updated time
        updateLastUpdated();

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showError('Failed to load dashboard data. Please try again.');
    }
};

// Update stats cards
const updateStats = (stats) => {
    if (!stats) return;

    elements.totalRevenue.textContent = formatCurrency(stats.totalRevenue || 0);
    elements.totalUsers.textContent = stats.totalUsers || 0;
    elements.totalProducts.textContent = stats.totalProducts || 0;
};

// Update top products list
const updateTopProducts = (products) => {
    if (!products || !products.length) {
        elements.topProducts.innerHTML = '<div class="no-data">No products found</div>';
        return;
    }

    const items = products.map((product, index) => `
        <div class="product-item">
            <span class="rank">${index + 1}</span>
            <img src="${product.image_url || '../images/placeholder-product.jpg'}" 
                 alt="${product.name}" 
                 class="product-image" 
                 onerror="this.src='../images/placeholder-product.jpg'"
            >
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-sales">
                    ${product.sold || 0} sold • ${formatCurrency(product.revenue || 0)} revenue
                </div>
            </div>
        </div>
    `).join('');

    elements.topProducts.innerHTML = items;
};

// Update sales chart
const updateSalesChart = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/sales?days=${currentPeriod}`);
        const data = await response.json();

        if (!data.labels || !data.data) {
            console.error('Invalid chart data format:', data);
            return;
        }

        const ctx = elements.salesChart.getContext('2d');

        // Destroy previous chart if it exists
        if (salesChart) {
            salesChart.destroy();
        }

        // Create new chart
        salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Sales',
                    data: data.data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                return `$${context.raw.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error updating sales chart:', error);
    }
};

// Show error message
const showError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.textContent = message;

    // Insert at the top of the dashboard content
    const dashboardContent = document.querySelector('.dashboard-content');
    dashboardContent.insertBefore(errorDiv, dashboardContent.firstChild);

    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
};

// Initialize the dashboard
const initDashboard = () => {
    // Initial data load
    fetchDashboardData();

    // Set up refresh button
    if (elements.refreshBtn) {
        elements.refreshBtn.addEventListener('click', fetchDashboardData);
    }

    // Set up period selector
    if (elements.salesPeriod) {
        elements.salesPeriod.addEventListener('change', (e) => {
            currentPeriod = parseInt(e.target.value);
            updateSalesChart();
        });
    }

    // Set up auto-refresh every 5 minutes
    setInterval(fetchDashboardData, 5 * 60 * 1000);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.admin-sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 992 &&
            !event.target.closest('.admin-sidebar') &&
            !event.target.closest('.menu-toggle')) {
            sidebar.classList.remove('active');
        }
    });

    // Handle active navigation items
    const navLinks = document.querySelectorAll('.admin-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });

            // Add active class to clicked link
            this.parentElement.classList.add('active');

            // Close sidebar on mobile after clicking a link
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    // Handle dropdown menus
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('show');
                }
            });

            // Toggle current dropdown
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.matches('.has-dropdown > a')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Initialize charts (placeholder - would use Chart.js in a real application)
    function initCharts() {
        // This is a placeholder for chart initialization
        // In a real application, you would use a library like Chart.js
        console.log('Charts would be initialized here');
    }

    // Initialize date picker (placeholder)
    function initDatePicker() {
        // This is a placeholder for date picker initialization
        console.log('Date picker would be initialized here');
    }

    // Initialize tooltips
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize all components
    function init() {
        initCharts();
        initDatePicker();

        // Initialize Bootstrap tooltips if Bootstrap is available
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            initTooltips();
        }
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle form submissions
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });

    // Handle file upload preview
    const fileInputs = document.querySelectorAll('.custom-file-input');

    fileInputs.forEach(input => {
        input.addEventListener('change', function () {
            const fileName = this.files[0] ? this.files[0].name : 'Choose file';
            const label = this.nextElementSibling;

            if (label && label.classList.contains('custom-file-label')) {
                label.textContent = fileName;
            }

            // Show image preview if it's an image upload
            if (this.files && this.files[0] && this.files[0].type.match('image.*')) {
                const preview = this.closest('.form-group').querySelector('.image-preview');

                if (preview) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        preview.innerHTML = `<img src="${e.target.result}" class="img-fluid" alt="Preview">`;
                    }

                    reader.readAsDataURL(this.files[0]);
                }
            }
        });
    });

    // Handle confirmation dialogs
    const confirmButtons = document.querySelectorAll('[data-confirm]');

    confirmButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (!confirm(this.getAttribute('data-confirm'))) {
                e.preventDefault();
            }
        });
    });

    // Handle tab navigation with URL hash
    if (window.location.hash) {
        const tabTrigger = new bootstrap.Tab(document.querySelector(`[href="${window.location.hash}"]`));
        tabTrigger.show();
    }

    // Update URL hash when tab is shown
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');

    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', function (e) {
            window.location.hash = e.target.getAttribute('href');
        });
    });

    // Handle logout with confirmation
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Show confirmation dialog
            const isConfirmed = confirm('Are you sure you want to log out?');
            if (isConfirmed) {
                sessionStorage.removeItem('isAdminLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Sample data for demonstration
const sampleData = {
    sales: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            fill: true
        }]
    },
    visitors: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Visitors',
            data: [100, 200, 150, 250, 200, 300, 250],
            borderColor: '#1cc88a',
            backgroundColor: 'rgba(28, 200, 138, 0.1)',
            fill: true
        }]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatDate,
        sampleData
    };
}
