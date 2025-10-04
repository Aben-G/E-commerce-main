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

    // Load carousel if carousel container exists
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) loadFeaturedProducts();

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

// Load featured products carousel
async function loadFeaturedProducts() {
    console.log('Loading featured products carousel...');

    // Get carousel elements
    carouselTrack = document.getElementById('carouselTrack');
    carouselIndicators = document.getElementById('carouselIndicators');
    carouselPrev = document.getElementById('carouselPrev');
    carouselNext = document.getElementById('carouselNext');

    console.log('Carousel elements found:', {
        track: !!carouselTrack,
        indicators: !!carouselIndicators,
        prev: !!carouselPrev,
        next: !!carouselNext
    });

    // Get real products from dataManager
    let realProducts = [];
    try {
        const { getProducts } = await import('./dataManager.js');
        realProducts = await getProducts();
        console.log('Products loaded:', realProducts.length);
    } catch (error) {
        console.log('DataManager not available, error:', error);
        realProducts = [];
    }

    // Fallback: Create sample products for testing if no real products
    if (realProducts.length === 0) {
        console.log('No real products found, using sample data for demo');
        realProducts = [
            {
                id: 1,
                name: 'Premium Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
                price: 199.99,
                oldPrice: 249.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                category: 'Audio',
                badge: 'Sale'
            },
            {
                id: 2,
                name: 'Latest Smartphone Pro',
                description: 'Cutting-edge smartphone with advanced camera system and lightning-fast performance.',
                price: 899.99,
                oldPrice: 999.99,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
                category: 'Smartphones',
                badge: 'New'
            },
            {
                id: 3,
                name: 'Ultra-Light Laptop',
                description: 'Powerful yet lightweight laptop perfect for work and travel.',
                price: 1299.99,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                category: 'Laptops'
            },
            {
                id: 4,
                name: 'Smart Fitness Watch',
                description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
                price: 299.99,
                oldPrice: 349.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
                category: 'Wearables'
            },
            {
                id: 5,
                name: 'Premium Tablet',
                description: 'Versatile tablet with stunning display and all-day battery life.',
                price: 599.99,
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
                category: 'Tablets'
            },
            {
                id: 6,
                name: 'Wireless Earbuds',
                description: 'Crystal clear sound with active noise cancellation and comfortable fit.',
                price: 149.99,
                oldPrice: 179.99,
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
                category: 'Audio'
            }
        ];
    }

    if (realProducts.length === 0) {
        console.log('No products found, showing fallback message');
        if (carouselTrack) {
            carouselTrack.innerHTML = '<div class="no-products"><p>No products available. Please add some products from the admin panel to see the carousel in action!</p><p><strong>Make sure your backend server is running on port 5000.</strong></p></div>';
        }
        return;
    }

    console.log('Creating carousel with', realProducts.length, 'products');
    // Get featured products (first 6 products for carousel)
    const featured = realProducts.slice(0, 6);

    // Generate carousel slides
    const slidesHTML = featured.map((product, index) => createCarouselSlide(product, index)).join('');
    if (carouselTrack) {
        carouselTrack.innerHTML = slidesHTML;
        console.log('Slides HTML generated and inserted');
    }

    // Generate indicators
    const indicatorsHTML = featured.map((_, index) =>
        `<button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
    ).join('');
    if (carouselIndicators) {
        carouselIndicators.innerHTML = indicatorsHTML;
        console.log('Indicators HTML generated and inserted');
    }

    // Initialize carousel
    initializeCarousel(featured.length);

    // Setup indicator click events
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Setup navigation buttons
    if (carouselPrev) carouselPrev.addEventListener('click', () => previousSlide());
    if (carouselNext) carouselNext.addEventListener('click', () => nextSlide());

    // Auto-play carousel
    startAutoPlay();

    console.log('Carousel fully initialized and running');
}

// Create carousel slide HTML
function createCarouselSlide(product, index) {
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <div class="slide-background"></div>
            <div class="slide-content">
                <div class="slide-image">
                    <img src="${product.image || 'https://via.placeholder.com/400x300?text=Product'}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="slide-badge">${product.badge}</span>` : ''}
                </div>

                <div class="slide-info">
                    <div class="slide-category">${product.category || 'Featured'}</div>
                    <h3 class="slide-title">${product.name}</h3>

                    <div class="slide-rating">
                        ${renderRating(product.rating || 4.5)}
                        <span class="rating-count">(${product.reviewCount || Math.floor(Math.random() * 100) + 10})</span>
                    </div>

                    <div class="slide-price">
                        <span class="current-price">$${product.price ? product.price.toFixed(2) : '99.99'}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                    </div>

                    <div class="slide-description">
                        <p>${product.description || 'Discover amazing features and unbeatable quality in this featured product. Perfect for your needs!'}</p>
                    </div>

                    <div class="slide-actions">
                        <a href="products.html" class="btn btn-primary slide-btn">
                            <i class="fas fa-shopping-bag"></i> Shop Now
                        </a>
                        <button class="btn btn-outline slide-wishlist">
                            <i class="far fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <!-- Decorative elements -->
            <div class="slide-decoration slide-decoration-1"></div>
            <div class="slide-decoration slide-decoration-2"></div>
        </div>
    `;
}

// Create product card HTML
function createProductCard(product) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    
    return `
        <div class="product-card fade-in featured-banner">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <a href="products.html">
                <div class="product-img">
                    <div class="featured-overlay">
                        <span class="featured-text">Shop Now</span>
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


function showNotification(message, type = 'success') {
    alert(message);
}


let currentSlide = 0;
let totalSlides = 0;
let autoPlayInterval = null;
let isTransitioning = false;


let carouselTrack, carouselIndicators, carouselPrev, carouselNext;


function initializeCarousel(slideCount) {
    totalSlides = slideCount;
    currentSlide = 0;
    updateCarousel();

   
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}


function updateCarousel() {
    if (!carouselTrack) {
        console.log('Carousel track not found');
        return;
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    console.log('Updating carousel:', {
        currentSlide,
        totalSlides,
        slidesFound: slides.length,
        indicatorsFound: indicators.length
    });

   
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.style.transform = 'translateX(0%) scale(1)';
            slide.style.opacity = '1';
            slide.style.zIndex = '2';
            slide.style.visibility = 'visible';
        } else if (index < currentSlide) {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(-100%) scale(0.9)';
            slide.style.opacity = '0.5';
            slide.style.zIndex = '1';
            slide.style.visibility = 'hidden';
        } else {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(100%) scale(0.9)';
            slide.style.opacity = '0.5';
            slide.style.zIndex = '1';
            slide.style.visibility = 'hidden';
        }
    });

  
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}


function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;

    isTransitioning = true;
    currentSlide = slideIndex;
    updateCarousel();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}


function nextSlide() {
    if (isTransitioning) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Previous slide
function previousSlide() {
    if (isTransitioning) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Auto-play functions
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 4000); // Change slide every 4 seconds
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
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
