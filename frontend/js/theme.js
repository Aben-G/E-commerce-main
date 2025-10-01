document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on initial load
    document.body.classList.add(`${currentTheme}-theme`);
    if (themeToggle) {
        themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Theme toggle button event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            
            // Remove existing theme class
            document.body.classList.remove('light-theme', 'dark-theme');
            
            // Add new theme class
            document.body.classList.add(`${theme}-theme`);
            
            // Update the icon
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save the theme to local storage
            localStorage.setItem('theme', theme);
        });
    }
});
