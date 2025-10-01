// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.getElementById('newsletterForm');
const categoryGrid = document.getElementById('categoryGrid');
const featuredProducts = document.getElementById('featuredProducts');
// offerSlider removed

// Sample Data (In a real app, this would come from an API)
const categories = [
    { id: 1, name: 'Smartphones', slug: 'smartphones', icon: 'fas fa-mobile-alt', count: 0 },
    { id: 2, name: 'Laptops', slug: 'laptops', icon: 'fas fa-laptop', count: 0 },
    { id: 3, name: 'Tablets', slug: 'tablets', icon: 'fas fa-tablet-alt', count: 0 },
    { id: 4, name: 'Audio', slug: 'audio', icon: 'fas fa-headphones', count: 0 },
    { id: 5, name: 'Wearables', slug: 'wearables', icon: 'fas fa-clock', count: 0 },
    { id: 6, name: 'Accessories', slug: 'accessories', icon: 'fas fa-plug', count: 0 },
];

const products = []; // No sample products - only real products from admin panel

// Special offers removed

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
function init() {
    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Load dynamic content
    if (categoryGrid) loadCategories();
    if (featuredProducts) loadFeaturedProducts();
    
    // Update cart count
    updateCartCount();
    
    // Add animation on scroll
    setupScrollAnimations();
}

// Toggle mobile menu
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // In a real app, you would send this to your server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
}

// Load categories
async function loadCategories() {
    if (!categories.length) return;
    
    // Get real product counts from dataManager if available
    let realProducts = [];
    try {
        const { getProducts } = await import('./dataManager.js');
        realProducts = await getProducts();
    } catch (error) {
        console.log('DataManager not available, using sample data');
    }
    
    // Update category counts based on real products
    const updatedCategories = categories.map(category => {
        const categoryProducts = realProducts.filter(product => 
            product.category && product.category.toLowerCase().includes(category.slug.replace('-', ''))
        );
        return {
            ...category,
            count: categoryProducts.length
        };
    });
    
    const categoriesHTML = updatedCategories.map(category => `
        <div class="category-card fade-in">
            <a href="products.html?category=${category.slug}">
                <i class="category-icon ${category.icon}"></i>
                <h3>${category.name}</h3>
                <p>${category.count} items</p>
            </a>
        </div>
    `).join('');
    
    categoryGrid.innerHTML = categoriesHTML;
}

// Load featured products
async function loadFeaturedProducts() {
    // Get real products from dataManager
    let realProducts = [];
    try {
        const { getProducts } = await import('./dataManager.js');
        realProducts = await getProducts();
    } catch (error) {
        console.log('DataManager not available');
        realProducts = [];
    }
    
    if (realProducts.length === 0) {
        featuredProducts.innerHTML = '<div class="no-products"><p>No products available. Please add some from the admin panel.</p></div>';
        return;
    }
    
    // Get featured products (first 6 products)
    const featured = realProducts.slice(0, 6);
    
    const productsHTML = featured.map(product => createProductCard(product)).join('');
    featuredProducts.innerHTML = productsHTML;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });
}

// Create product card HTML
function createProductCard(product) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    
    return `
        <div class="product-card fade-in">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <a href="product/${product.slug}.html">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions">
                        <button class="action-btn" title="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn" title="Quick view">
                            <i class="far fa-eye"></i>
                        </button>
                        <button class="action-btn" title="Add to compare">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${renderRating(product.rating)}
                        <span class="product-rating-count">(${product.reviewCount})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        ${product.oldPrice ? `<span class="discount">-${discount}%</span>` : ''}
                    </div>
                </div>
            </a>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
}

// Render star rating
function renderRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Special offers functions removed

// Add product to cart
async function addToCart(productId) {
    // Get real products from dataManager
    let allProducts = [];
    try {
        const { getProducts } = await import('./dataManager.js');
        allProducts = await getProducts();
    } catch (error) {
        console.error('DataManager not available');
        showNotification('Unable to add product to cart. Please try again.', 'error');
        return;
    }
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        showNotification('Product not found. Please try again.', 'error');
        return;
    }
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity if already in cart
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`,
            quantity: 1
        });
    }
    
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification(`${product.name} added to cart`);
}

// Update cart count in header
function updateCartCount() {
    if (!cartCount) return;
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    // In a real app, you'd use a more sophisticated notification system
    alert(message);
}

// Setup scroll animations
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderRating,
        createProductCard,
        loadCategories,
        loadFeaturedProducts,
        addToCart,
        updateCartCount
    };
}
