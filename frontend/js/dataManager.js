// --- Data Manager for Backend API ---

const API_BASE_URL = 'http://localhost:5000/api';
let cachedProducts = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Initialize data structures in localStorage if they don't exist
function initializeStore() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

// --- Product Functions ---

/**
 * Retrieves all products from backend API with caching.
 * @returns {Array} An array of product objects.
 */
export async function getProducts() {
    const now = Date.now();
    
    // Return cached products if they're still fresh
    if (cachedProducts.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedProducts;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // Transform backend products to frontend format
        cachedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            image: product.image_url ? 
                (product.image_url.startsWith('http') ? product.image_url : `${API_BASE_URL.replace('/api', '')}${product.image_url}`) : 
                `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`,
            category: product.category || 'General',
            sku: product.sku,
            stock: product.stock || 0,
            status: product.status !== false,
            rating: 4.5, // Default rating
            reviewCount: Math.floor(Math.random() * 100) + 10, // Random review count
            slug: product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `product-${product.id}`
        }));
        
        lastFetchTime = now;
        return cachedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return cached products if available, otherwise empty array
        return cachedProducts.length > 0 ? cachedProducts : [];
    }
}

/**
 * Synchronous version that returns cached products only
 * @returns {Array} An array of cached product objects.
 */
export function getProductsSync() {
    return cachedProducts;
}

/**
 * Retrieves a single product by its ID.
 * @param {number} productId - The ID of the product.
 * @returns {object|null} The product object or null if not found.
 */
export async function getProductById(productId) {
    const products = await getProducts();
    return products.find(p => p.id === productId) || null;
}

/**
 * Synchronous version that searches cached products only
 * @param {number} productId - The ID of the product.
 * @returns {object|null} The product object or null if not found.
 */
export function getProductByIdSync(productId) {
    return cachedProducts.find(p => p.id === productId) || null;
}

/**
 * Force refresh products from backend
 * @returns {Array} An array of product objects.
 */
export async function refreshProducts() {
    lastFetchTime = 0; // Reset cache
    return await getProducts();
}

/**
 * Update a product via API
 * @param {number} productId - The ID of the product to update
 * @param {object} productData - The updated product data
 * @returns {object} The updated product object
 */
export async function updateProduct(productId, productData) {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {})
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedProduct = await response.json();
        
        // Update cache
        const index = cachedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
            cachedProducts[index] = {
                ...cachedProducts[index],
                ...updatedProduct,
                image: updatedProduct.image_url ? 
                    (updatedProduct.image_url.startsWith('http') ? updatedProduct.image_url : `${API_BASE_URL.replace('/api', '')}${updatedProduct.image_url}`) : 
                    `https://via.placeholder.com/300x300?text=${encodeURIComponent(updatedProduct.name)}`
            };
        }
        
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

/**
 * Delete a product via API
 * @param {number} productId - The ID of the product to delete
 * @returns {object} The deletion result
 */
export async function deleteProduct(productId) {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {})
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Remove from cache
        cachedProducts = cachedProducts.filter(p => p.id !== productId);
        
        return result;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// --- Cart Functions ---

/**
 * Retrieves the cart from localStorage.
 * @returns {Array} An array of cart item objects.
 */
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Saves the entire cart to localStorage.
 * @param {Array} cart - The array of cart items.
 */
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Adds an item to the cart or updates its quantity.
 * @param {number} productId - The ID of the product to add.
 * @param {number} quantity - The quantity to add.
 */
export async function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = await getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
}

/**
 * Removes an item from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

/**
 * Updates the quantity of an item in the cart.
 * @param {number} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity.
 */
export function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
    }
    saveCart(cart);
}

/**
 * Clears the entire cart.
 */
export function clearCart() {
    saveCart([]);
}

// Initialize the store on script load
initializeStore();
