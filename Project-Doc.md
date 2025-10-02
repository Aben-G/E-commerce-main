# E-commerce Project - Complete Technical Documentation with DOM Tree Structures

## Table of Contents
1. [Project Overview](#project-overview)
2. [Complete File Structure](#complete-file-structure)
3. [HTML Files Deep Dive](#html-files-deep-dive)
4. [CSS Files Deep Dive](#css-files-deep-dive)
5. [JavaScript Files Deep Dive](#javascript-files-deep-dive)
6. [DOM Tree Structures](#dom-tree-structures)
7. [Backend Architecture](#backend-architecture)
8. [Database Schema](#database-schema)
9. [API Endpoints](#api-endpoints)
10. [Admin Panel](#admin-panel)

---

## Project Overview

This is a full-stack e-commerce application built with:
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, responsive design
- **Backend**: Node.js, Express.js, PostgreSQL
- **Authentication**: JWT-based authentication
- **File Management**: Multer for image uploads
- **Caching**: Frontend product caching with localStorage
- **Theming**: Dark/light mode toggle

---

## Complete File Structure

### Frontend Files (13 HTML files):
```
frontend/
├── index.html              # Homepage
├── products.html           # Products listing page
├── cart.html              # Shopping cart page
├── about.html             # About us page
├── contact.html           # Contact page
├── faq.html               # FAQ page
├── order-tracking.html    # Order tracking page
├── shipping-info.html     # Shipping information page
└── admin/
    ├── index.html         # Admin dashboard
    ├── login.html         # Admin login
    ├── register.html      # Admin registration
    ├── products.html      # Admin product management
    └── users.html         # Admin user management
```

### CSS Files (11 CSS files):
```
frontend/css/
├── style.css              # Main global stylesheet
├── products.css           # Products page styles
├── cart.css               # Cart page styles
├── about.css              # About page styles
├── contact.css            # Contact page styles
├── faq.css                # FAQ page styles
├── order-tracking.css     # Order tracking styles
├── shipping-info.css      # Shipping info styles
└── admin/css/
    ├── admin.css          # Admin global styles
    ├── admin-dashboard.css # Admin dashboard styles
    └── auth.css           # Admin authentication styles
```

### JavaScript Files (6 main JS files):
```
frontend/js/
├── main.js                # Main frontend logic
├── dataManager.js         # API communication and data management
├── theme.js               # Theme management
└── admin/js/
    ├── admin.js           # Admin dashboard logic
    ├── auth.js            # Admin authentication
    └── authGuard.js       # Route protection
```

---

## HTML Files Deep Dive

### 1. `frontend/index.html` - Homepage

**Sections and Structure:**
- **Head Section**: Meta tags, title, CSS links (style.css, products.css, cart.css), Font Awesome
- **Header Section** (`class="header"`):
  - Logo (`class="logo"`) with link to homepage
  - Main Navigation (`class="main-nav"`) with links to Home, Products, About, Contact
  - Header Actions (`class="header-actions"`):
    - Cart button (`class="cart-btn"`) with cart count badge (`class="cart-count"`)
    - Theme toggle button (`id="theme-toggle"`)
    - Mobile menu button (`class="mobile-menu-btn"`)
- **Hero Section** (`class="hero"`):
  - Hero content with h1 title and description
  - Call-to-action buttons
- **Featured Products Section** (`class="featured-products" id="featured-carousel"`):
  - Carousel container with track (`id="carouselTrack"`)
  - Navigation buttons (`id="carouselPrev"`, `id="carouselNext"`)
  - Indicators container (`id="carouselIndicators"`)
- **Categories Section** (`class="categories" id="categories"`):
  - Category grid (`id="categoryGrid"`) for displaying product categories
- **Newsletter Section** (`class="newsletter"`):
  - Newsletter form (`id="newsletterForm"`) with email input
- **Footer Section**: 
  - Company info, quick links, contact info
  - Social media links and payment methods

**Key IDs and Classes:**
- `mobileMenuBtn`: Mobile menu toggle button
- `mainNav`: Main navigation menu
- `cartCount`: Cart item count display
- `newsletterForm`: Newsletter subscription form
- `categoryGrid`: Container for category cards
- `carouselTrack`: Carousel slide container
- `carouselIndicators`: Carousel navigation dots

### 2. `frontend/products.html` - Products Listing Page

**Sections and Structure:**
- **Head Section**: Includes additional `products.css` for page-specific styling
- **Header Section**: Same structure as index.html
- **Products Header** (`class="products-header"`):
  - Page title (h1)
  - Breadcrumb navigation (`class="breadcrumb"`)
- **Products Section** (`class="products-section"`):
  - Products container with toolbar:
    - Products count (`class="products-count"`)
    - Search input (`class="search-input" id="searchInput"`)
    - Sort dropdown (`class="sort" id="sort"`)
  - Category filter buttons (`class="category-btn"`) within `category-filters`
  - Products grid (`class="products-grid" id="productsGrid"`)
  - Pagination (`class="pagination"`)
- **Product Modal** (`class="product-modal" id="productModal"`):
  - Modal overlay (`class="modal-overlay"`)
  - Close button (`class="modal-close" id="modalClose"`)
  - Modal body with:
    - Product image (`id="modalProductImage"`)
    - Thumbnail container (`id="modalThumbnails"`)
    - Product name (`id="modalProductName"`)
    - Product rating (`id="modalProductRating"`)
    - Product price (`id="modalProductPrice"`)
    - Product description (`id="modalProductDescription"`)
    - Quantity selector and add to cart button (`id="modalAddToCart"`)
- **Newsletter and Footer**: Same as index.html

**Key IDs and Classes:**
- `searchInput`: Product search input field
- `sort`: Product sorting dropdown
- `productsGrid`: Container for product cards
- `productModal`: Product detail modal
- `modalProductImage`: Modal product image display
- `modalProductName`: Modal product name display
- `modalAddToCart`: Add to cart button in modal

### 3. `frontend/cart.html` - Shopping Cart Page

**Sections and Structure:**
- **Head Section**: Includes additional `cart.css` for cart-specific styling
- **Header Section**: Same structure as index.html
- **Main Content** (`class="cart-page"`):
  - Page title (h1)
  - Cart content container (`id="cartContent"`) - initially hidden
  - Cart container with:
    - Cart items section (`class="cart-items"`):
      - Cart header (`class="cart-header"`) with column headers
      - Cart items container (`id="cartItemsContainer"`)
    - Cart summary (`class="cart-summary"`):
      - Subtotal (`id="cartSubtotal"`)
      - Tax (`id="cartTax"`)
      - Total (`id="cartTotal"`)
      - Checkout button
      - Coupon form
      - Continue shopping link
  - Empty cart message (`id="emptyCart"`) - shown by default
  - Order success modal (`id="orderSuccessModal"`) - initially hidden
- **Newsletter and Footer**: Same as index.html

**Key IDs and Classes:**
- `cartContent`: Main cart content container
- `cartItemsContainer`: Container for individual cart items
- `cartSubtotal`, `cartTax`, `cartTotal`: Price display elements
- `emptyCart`: Empty cart message container
- `orderSuccessModal`: Order confirmation modal

### 4. `frontend/about.html` - About Us Page

**Sections and Structure:**
- **Head Section**: Includes `about.css` for page-specific styling
- **Header Section**: Same structure as index.html with "About" as active
- **About Page Content** (`class="about-page"`):
  - **About Hero** (`class="about-hero"`):
    - Hero content with h1 title and description
  - **About Content** (`class="about-content"`):
    - About grid (`class="about-grid"`) with three sections:
      - Our Story (`class="about-section"` with rocket icon)
      - Our Mission (`class="about-section"` with bullseye icon)
      - Our Values (`class="about-section"` with heart icon and values list)
    - Stats Section (`class="stats-section"`) with statistics cards
- **Newsletter and Footer**: Same as index.html

**Key IDs and Classes:**
- `about-page`: Main page container
- `about-hero`: Hero section with company introduction
- `about-grid`: Grid layout for about sections
- `about-section`: Individual about content blocks
- `stats-section`: Company statistics display
- `values-list`: Unordered list of company values

### 5. `frontend/contact.html` - Contact Page

**Sections and Structure:**
- **Head Section**: Includes `contact.css` for page-specific styling
- **Header Section**: Same structure as index.html with "Contact" as active
- **Contact Page Content** (`class="contact-page"`):
  - **Contact Hero** (`class="contact-hero"`):
    - Hero content with h1 title and description
  - **Contact Content** (`class="contact-content"`):
    - Contact grid (`class="contact-grid"`) with:
      - Contact Form Section (`class="contact-form-section"`):
        - Contact form (`id="contactForm"`) with:
          - Form rows (`class="form-row"`) for first/last name
          - Form groups (`class="form-group"`) for email, phone, subject, message
          - Subject dropdown with multiple options
          - Submit button with paper plane icon
      - Contact Information Section (address, phone, email, hours)
- **Newsletter and Footer**: Same as index.html

**Key IDs and Classes:**
- `contact-page`: Main page container
- `contact-hero`: Hero section with contact introduction
- `contact-grid`: Grid layout for form and info
- `contactForm`: Main contact form
- `form-row`: Row container for side-by-side form fields
- `form-group`: Individual form field container

### 6. `frontend/admin/index.html` - Admin Dashboard

**Sections and Structure:**
- **Head Section**: Admin-specific CSS and scripts
- **Authentication Guard**: Inline script for redirecting unauthenticated users
- **Admin Sidebar** (`class="admin-sidebar"`):
  - Logo and admin navigation (`class="admin-nav"`)
  - Links to dashboard, products, users, logout button (`id="logoutButton"`)
- **Admin Main** (`class="admin-main"`):
  - Admin header with menu toggle, dashboard title
  - Refresh button (`id="refreshDashboard"`)
  - Last updated span (`id="lastUpdated"`)
  - Theme toggle
  - Dashboard content with:
    - Recent products section
    - Stats cards (`id="totalUsers"`, `id="totalProducts"`, `id="totalOrders"`, `id="totalRevenue"`)
    - Activity section
- **Scripts**: Includes authGuard.js, auth.js, admin.js, and inline dashboard functions

**Key IDs and Classes:**
- `logoutButton`: Admin logout button
- `refreshDashboard`: Dashboard data refresh button
- `lastUpdated`: Last update timestamp display
- `totalUsers`, `totalProducts`, `totalOrders`, `totalRevenue`: Statistics display elements

### 7. `frontend/admin/login.html` - Admin Login

**Sections and Structure:**
- **Head Section**: Admin authentication CSS and scripts
- **Body** (`class="auth-body"`):
  - Theme toggle button positioned absolutely
  - Auth Container (`class="auth-container"`):
    - Auth Card (`class="auth-card"`):
      - Auth Header (`class="auth-header"`): Login title and welcome message
      - Login Form (`id="loginForm"`) with:
        - Username input with user icon
        - Password input with lock icon
        - Remember me checkbox and forgot password link
        - Login submit button
      - Auth Footer (`class="auth-footer"`): Sign up link
- **Scripts**: theme.js and auth.js

**Key IDs and Classes:**
- `auth-body`: Page body with authentication styling
- `auth-container`: Centered authentication container
- `auth-card`: Main authentication card
- `auth-header`: Card header with title and message
- `loginForm`: Login form with username/password fields
- `auth-footer`: Card footer with registration link

---

## CSS Files Deep Dive

### 1. `frontend/css/style.css` - Main Global Stylesheet

**CSS Variables (Custom Properties):**
```css
:root {
    --primary-color: #2563eb;        /* Main brand color */
    --secondary-color: #1e40af;      /* Darker shade for hover states */
    --accent-color: #3b82f6;         /* Lighter accent color */
    --text-color: #1f2937;           /* Main text color */
    --light-text: #6b7280;           /* Secondary text color */
    --lighter-text: #9ca3af;         /* Muted text color */
    --background: #ffffff;           /* Main background */
    --light-bg: #f3f4f6;             /* Light background for sections */
    --border-color: #e5e7eb;         /* Border color */
    --success-color: #10b981;        /* Success state color */
    --danger-color: #ef4444;         /* Danger/error state color */
    --warning-color: #f59e0b;        /* Warning state color */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);      /* Small shadow */
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);  /* Medium shadow */
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);  /* Large shadow */
    --radius-sm: 0.25rem;            /* Small border radius */
    --radius: 0.5rem;               /* Medium border radius */
    --radius-lg: 1rem;              /* Large border radius */
    --transition: all 0.2s ease-in-out;  /* Default transition */
}
```

**Base Styles and Reset:**
- Global reset using `*` selector with `margin: 0`, `padding: 0`, `box-sizing: border-box`
- HTML base styles: `font-size: 16px`, `scroll-behavior: smooth`
- Body styles: Font family ('Segoe UI'), line height, color scheme, overflow control
- Link styles: No decoration, color inheritance, smooth transitions
- List styles: No default list styling
- Image styles: Responsive sizing, block display, auto height
- Form elements: Font inheritance, no background/border/outline by default

**Component Styles:**
- **Container**: `.container` - Max width 1200px, centered, responsive padding
- **Buttons**: `.btn`, `.btn-primary`, `.btn-outline` - Consistent button styling with hover effects
- **Header**: `.header` - Sticky positioning, shadow, z-index for layering
- **Navigation**: `.main-nav` - Flex layout, hover effects with animated underlines
- **Cart Count**: `.cart-count` - Positioned badge with danger background
- **Hero Section**: `.hero` - Gradient background, responsive text sizing
- **Categories**: `.category-grid` - Responsive grid layout, card-based design
- **Category Cards**: `.category-card` - Hover effects, icon animations, border styling

### 2. `frontend/css/products.css` - Products Page Specific Styles

**Page-Specific Rules:**
- **Products Header**: Light gray background, breadcrumb navigation styling
- **Products Grid**: Responsive grid layout with `repeat(auto-fill, minmax(220px, 1fr))`
- **Products Toolbar**: Flex layout with search and sort controls
- **Search Input**: Custom styling with focus states and icon positioning
- **Pagination**: Centered pagination with active/disabled states
- **Product Modal**: Overlay modal with product details and image gallery

**Dark Theme Support:**
- Comprehensive dark theme overrides using `body.dark-theme` selector
- Adjusts colors for backgrounds, text, borders, and form elements
- Maintains accessibility and contrast in dark mode

**Responsive Design:**
- Mobile-first approach with media queries
- Grid adjustments for smaller screens
- Toolbar reorganization for mobile layout

### 3. `frontend/css/cart.css` - Cart Page Specific Styles

**Cart Layout:**
- **Cart Container**: CSS Grid layout with 1fr main content and 350px sidebar
- **Cart Items**: Grid-based table layout with responsive columns
- **Cart Summary**: Fixed-width sidebar with order summary
- **Empty Cart**: Centered messaging with icon and call-to-action

**Component Styles:**
- **Product Image**: Fixed dimensions with object-fit cover and border radius
- **Quantity Selector**: Custom-styled quantity input with increment/decrement buttons
- **Remove Button**: Hover effects with color change to indicate danger
- **Checkout Button**: Full-width primary button with hover effects
- **Coupon Form**: Split input and button design

### 4. `frontend/css/about.css` - About Page Specific Styles

**About Page Layout:**
- **About Hero**: Full-width hero section with gradient background
- **About Grid**: Three-column grid for story, mission, values
- **About Sections**: Card-based layout with icons and consistent styling
- **Stats Section**: Grid layout for statistics display
- **Values List**: Custom-styled list with strong emphasis on key terms

**Visual Elements:**
- Icon integration using Font Awesome
- Consistent spacing and typography
- Responsive grid adjustments
- Hover effects on interactive elements

### 5. `frontend/css/contact.css` - Contact Page Specific Styles

**Contact Page Layout:**
- **Contact Hero**: Full-width hero section with contact messaging
- **Contact Grid**: Two-column layout for form and information
- **Contact Form**: Comprehensive form styling with proper spacing
- **Form Groups**: Consistent styling for form fields and labels
- **Input Groups**: Icon integration within form inputs

**Form Styling:**
- Custom form field styling with focus states
- Responsive form layout
- Button styling with icons
- Proper label and field association
- Error state handling (if implemented)

### 6. `frontend/admin/css/auth.css` - Admin Authentication Styles

**Authentication Layout:**
- **Auth Body**: Full-page background with theme support
- **Auth Container**: Centered authentication card container
- **Auth Card**: Main authentication card with shadow and border
- **Auth Header**: Card header with title and description
- **Auth Footer**: Card footer with additional links

**Form Styling:**
- Input groups with icon integration
- Custom checkbox styling
- Button styling with block display
- Responsive design for mobile devices
- Dark theme support

---

## JavaScript Files Deep Dive

### 1. `frontend/js/main.js` - Main Frontend Logic

**Core Functions and Their Purpose:**

**`init()` - Application Initialization:**
- Loads cart data from localStorage
- Sets up event listeners for mobile menu, newsletter form
- Calls dynamic content loaders (categories, featured products)
- Updates cart count display
- Initializes scroll animations

**`toggleMobileMenu()` - Mobile Menu Handler:**
- Toggles `active` class on main navigation
- Controls body overflow to prevent scrolling when menu is open
- Provides smooth mobile navigation experience

**`handleNewsletterSubmit()` - Newsletter Form Handler:**
- Prevents default form submission
- Extracts email from form input
- Logs subscription (in production, would send to server)
- Shows success alert and resets form

**`loadCategories()` - Category Loading:**
- Dynamically imports dataManager.js for product data
- Updates category counts based on real products from API
- Generates HTML for category cards with icons and counts
- Handles fallback when dataManager is not available

**`loadFeaturedProducts()` - Carousel Loading:**
- Imports product data from dataManager.js
- Creates fallback sample products if no real products available
- Generates carousel slides with product information
- Sets up carousel navigation and auto-play functionality
- Handles error states with user-friendly messages

**`createCarouselSlide(product, index)` - Slide Generation:**
- Creates HTML structure for individual carousel slides
- Calculates discount percentages
- Includes product image, name, rating, price, description
- Adds decorative elements and call-to-action buttons
- Handles missing data with fallbacks

**Carousel Functions:**
- `initializeCarousel()`: Sets up carousel state and event listeners
- `updateCarousel()`: Updates slide positions and indicators
- `goToSlide(index)`: Navigates to specific slide
- `nextSlide()` / `previousSlide()`: Handles navigation
- `startAutoPlay()` / `stopAutoPlay()`: Manages auto-rotation

**Event Listeners:**
- Mobile menu toggle click handler
- Newsletter form submission handler
- Carousel navigation button handlers
- Carousel indicator click handlers
- Cart interaction handlers

**API/Backend Integration:**
- Uses dynamic imports for dataManager.js
- Fetches real product data from backend API
- Handles API errors gracefully with fallbacks
- Integrates with localStorage for cart persistence

### 2. `frontend/js/dataManager.js` - API Communication and Data Management

**Core Functions and Their Purpose:**

**`initializeStore()` - LocalStorage Setup:**
- Creates `cart` and `orders` arrays in localStorage if they don't exist
- Ensures data structures are available on application start

**`getProducts()` - Product Fetching with Caching:**
- Implements 5-minute caching mechanism to reduce API calls
- Fetches products from `/api/products` endpoint
- Transforms backend product data to frontend format
- Handles image URL construction (absolute vs relative paths)
- Returns cached data if available and fresh
- Graceful error handling with fallback to cached data

**`getProductsSync()` - Synchronous Product Access:**
- Returns cached products without API call
- Used for immediate data access when freshness isn't critical

**`getProductById(productId)` - Individual Product Fetch:**
- Asynchronously fetches specific product by ID
- Utilizes cached data when available
- Returns null if product not found

**`getProductByIdSync(productId)` - Synchronous Individual Product Access:**
- Searches cached products for specific ID
- Returns null if not found in cache

**`refreshProducts()` - Cache Busting:**
- Forces fresh data fetch by resetting cache timestamp
- Used when data needs to be updated immediately

**`updateProduct(productId, productData)` - Product Update (Admin):**
- Sends PUT request to `/api/products/{productId}`
- Includes JWT token in Authorization header
- Updates local cache with new product data
- Handles image URL transformation
- Throws errors for UI handling

**`deleteProduct(productId)` - Product Deletion (Admin):**
- Sends DELETE request to `/api/products/{productId}`
- Includes JWT token for authentication
- Removes product from local cache
- Returns deletion result

**Cart Management Functions:**
- `getCart()`: Retrieves cart from localStorage
- `saveCart(cart)`: Saves cart to localStorage
- `addToCart(productId, quantity)`: Adds item or updates quantity
- `removeFromCart(productId)`: Removes item from cart
- `updateCartQuantity(productId, quantity)`: Updates item quantity
- `clearCart()`: Empties entire cart

**API/Backend Integration:**
- Base URL configuration (`http://localhost:5000/api`)
- Comprehensive error handling with try/catch blocks
- JWT token management for admin operations
- Data transformation between backend and frontend formats
- Image URL handling for both local and remote images

**localStorage Integration:**
- Persistent cart storage across sessions
- Order history storage
- Theme preference storage
- Cache management for performance optimization

### 3. `frontend/js/theme.js` - Theme Management

**Core Functionality:**

**DOMContentLoaded Event Handler:**
- Retrieves saved theme from localStorage or defaults to 'light'
- Applies saved theme class to document body
- Updates theme toggle button icon based on current theme

**Theme Toggle Event Handler:**
- Detects current theme and toggles between light/dark
- Removes existing theme classes and applies new one
- Updates button icon (sun for dark, moon for light)
- Saves new theme preference to localStorage

**Theme Integration:**
- Works seamlessly with CSS custom properties
- Provides immediate visual feedback
- Persists user preference across sessions

### 4. `frontend/admin/js/admin.js` - Admin Dashboard Logic

**Core Functions and Their Purpose:**

**`fetchDashboardData()` - Dashboard Data Loading:**
- Fetches dashboard stats and top products in parallel using Promise.all
- Updates statistics cards and top products list
- Initializes sales chart with real data
- Shows loading states and handles errors gracefully

**`updateStats(stats)` - Statistics Display:**
- Updates total revenue, users, products, and orders
- Formats currency using Intl.NumberFormat
- Handles missing data with zero fallbacks

**`updateTopProducts(products)` - Top Products List:**
- Generates HTML for top 5 products
- Includes product images, names, sales count, and revenue
- Handles missing images with fallback placeholders
- Shows "No products found" message when empty

**`updateSalesChart()` - Chart Management:**
- Fetches sales data from `/api/sales` endpoint
- Destroys existing chart instance to prevent memory leaks
- Creates new Chart.js line chart with sales data
- Configures responsive design, tooltips, and formatting
- Handles chart errors gracefully

**`formatCurrency(amount)` - Currency Formatting:**
- Uses Intl.NumberFormat for consistent currency display
- Formats as USD with 2 decimal places

**`formatDate(dateString)` - Date Formatting:**
- Converts date strings to localized format
- Uses short month format for display

**`showError(message)` - Error Display:**
- Creates temporary error alert div
- Inserts at top of dashboard content
- Auto-removes after 5 seconds
- Provides user-friendly error feedback

**Event Listeners:**
- Dashboard refresh button click handler
- Sales period selector change handler
- Mobile menu toggle functionality
- Navigation link active state management
- Dropdown menu toggle handlers
- Click-outside handlers for closing menus

**API/Backend Integration:**
- Uses relative API paths (`/api/...`)
- Fetches dashboard statistics, top products, and sales data
- Handles API errors with user-friendly messages
- Implements auto-refresh every 5 minutes

### 5. `frontend/admin/js/auth.js` - Authentication Management

**Core Functions and Their Purpose:**

**`handleLogout()` - Logout Process:**
- Shows confirmation dialog to user
- Clears adminToken from localStorage
- Clears admin session flag from sessionStorage
- Redirects to login page

**Login Form Handler:**
- Prevents default form submission
- Extracts username and password
- Sends POST request to `/api/login`
- Handles JWT token response
- Stores token in localStorage and session flag
- Redirects to dashboard on success
- Shows error messages on failure

**Registration Form Handler:**
- Prevents default form submission
- Validates password confirmation
- Sends POST request to `/api/register`
- Handles successful registration with redirect
- Shows error messages on failure

**Event Listeners:**
- Logout button click handler
- Login form submission handler
- Registration form submission handler

**Security Features:**
- JWT token management
- Session flag for legacy compatibility
- Password confirmation validation
- Error handling without exposing sensitive information

### 6. `frontend/admin/js/authGuard.js` - Route Protection

**Core Functionality:**
- Checks for admin authentication token in localStorage
- Redirects unauthenticated users to login page
- Protects admin routes from unauthorized access
- Provides security for admin panel access

---

## DOM Tree Structures

### 1. Homepage (`index.html`) DOM Structure

```
html
├── head
│   ├── meta charset="UTF-8"
│   ├── meta viewport
│   ├── title
│   ├── link rel="stylesheet" href="css/style.css"
│   ├── link rel="stylesheet" href="css/products.css"
│   ├── link rel="stylesheet" href="css/cart.css"
│   └── link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
├── body
│   ├── header.header
│   │   ├── div.container
│   │   │   ├── div.header-content
│   │   │   │   ├── div.logo
│   │   │   │   │   └── a[href="index.html"]
│   │   │   │   ├── nav.main-nav
│   │   │   │   │   └── ul
│   │   │   │   │       ├── li (Home)
│   │   │   │   │       ├── li (Products)
│   │   │   │   │       ├── li (About)
│   │   │   │   │       └── li (Contact)
│   │   │   │   └── div.header-actions
│   │   │   │       ├── a.cart-btn
│   │   │   │       │   ├── i.fas.fa-shopping-cart
│   │   │   │       │   └── span.cart-count
│   │   │   │       ├── button#theme-toggle.theme-toggle-btn
│   │   │   │       │   └── i.fas.fa-moon
│   │   │   │       └── button.mobile-menu-btn
│   │   │   │           └── i.fas.fa-bars
│   │   ├── section.hero
│   │   │   ├── div.container
│   │   │   │   └── div.hero-content
│   │   │   │       ├── h1
│   │   │   │       └── p
│   │   ├── section.featured-products#featured-carousel
│   │   │   ├── div.container
│   │   │   │   ├── div.carousel-container
│   │   │   │   │   ├── div.carousel-track#carouselTrack
│   │   │   │   │   ├── button.carousel-nav#carouselPrev
│   │   │   │   │   ├── button.carousel-nav#carouselNext
│   │   │   │   │   └── div.carousel-indicators#carouselIndicators
│   │   ├── section.categories#categories
│   │   │   ├── div.container
│   │   │   │   └── div.category-grid#categoryGrid
│   │   ├── section.newsletter
│   │   │   ├── div.container
│   │   │   │   └── form#newsletterForm
│   │   │   │   ├── input[type="email"]
│   │   │   │   └── button[type="submit"]
│   │   └── footer
│   │       ├── div.container
│   │       │   ├── div.footer-content
│   │       │   │   ├── div.footer-section
│   │       │   │   ├── div.footer-section
│   │       │   │   └── div.footer-section
│   │       │   └── div.footer-bottom
│   └── script[src="js/main.js" type="module"]
│   └── script[src="js/theme.js"]
```

### 2. Products Page (`products.html`) DOM Structure

```
html
├── head (similar to index.html with additional products.css)
├── body
│   ├── header.header (same structure as index.html)
│   ├── main.products-page
│   │   ├── section.products-header
│   │   │   ├── div.container
│   │   │   │   ├── h1
│   │   │   │   └── nav.breadcrumb
│   │   ├── section.products-section
│   │   │   ├── div.container
│   │   │   │   ├── div.products-toolbar
│   │   │   │   │   ├── span.products-count
│   │   │   │   │   ├── div.search-container
│   │   │   │   │   │   ├── input.search-input#searchInput
│   │   │   │   │   │   └── i.search-icon
│   │   │   │   │   └── div.sort-options
│   │   │   │   │       └── select.sort#sort
│   │   │   │   ├── div.category-filters
│   │   │   │   │   └── button.category-btn (multiple)
│   │   │   │   ├── div.products-grid#productsGrid
│   │   │   │   └── nav.pagination
│   │   ├── div.product-modal#productModal
│   │   │   ├── div.modal-overlay
│   │   │   ├── div.modal-content
│   │   │   │   ├── button.modal-close#modalClose
│   │   │   │   ├── div.modal-body
│   │   │   │   │   ├── div.modal-image-container
│   │   │   │   │   │   ├── img.modal-product-image#modalProductImage
│   │   │   │   │   │   └── div.modal-thumbnails#modalThumbnails
│   │   │   │   │   ├── div.modal-info
│   │   │   │   │   │   ├── h2.modal-product-name#modalProductName
│   │   │   │   │   │   ├── div.modal-product-rating#modalProductRating
│   │   │   │   │   │   ├── div.modal-product-price#modalProductPrice
│   │   │   │   │   │   ├── p.modal-product-description#modalProductDescription
│   │   │   │   │   │   ├── div.modal-product-meta
│   │   │   │   │   │   └── div.modal-actions
│   │   │   │   │   │       ├── div.quantity-selector
│   │   │   │   │   │       └── button#modalAddToCart
│   │   ├── section.newsletter (same as index.html)
│   │   └── footer (same as index.html)
│   └── scripts (same as index.html with additional product-specific script)
```

### 3. Cart Page (`cart.html`) DOM Structure

```
html
├── head (similar to index.html with additional cart.css)
├── body
│   ├── header.header (same structure as index.html)
│   ├── main.cart-page
│   │   ├── div.container
│   │   │   ├── h1.page-title
│   │   │   ├── div#cartContent (initially hidden)
│   │   │   │   ├── div.cart-container
│   │   │   │   │   ├── div.cart-items
│   │   │   │   │   │   ├── div.cart-header
│   │   │   │   │   │   │   ├── div (Image)
│   │   │   │   │   │   │   ├── div (Product)
│   │   │   │   │   │   │   ├── div (Price)
│   │   │   │   │   │   │   ├── div (Quantity)
│   │   │   │   │   │   │   ├── div (Subtotal)
│   │   │   │   │   │   │   └── div (Remove)
│   │   │   │   │   │   └── div#cartItemsContainer
│   │   │   │   │   │   └── div.cart-item (multiple)
│   │   │   │   │   │       ├── img.product-image
│   │   │   │   │   │       ├── div.product-details
│   │   │   │   │   │       ├── div.product-price
│   │   │   │   │   │       ├── div.quantity-selector
│   │   │   │   │   │       ├── div.subtotal
│   │   │   │   │   │       └── button.remove-btn
│   │   │   │   │   └── div.cart-summary
│   │   │   │   │       ├── h3.summary-title
│   │   │   │   │       ├── div.summary-row (multiple)
│   │   │   │   │       ├── div.summary-row.total
│   │   │   │   │       ├── button.checkout-btn
│   │   │   │   │       ├── form.coupon-form
│   │   │   │   │       └── a.continue-shopping
│   │   │   ├── div#emptyCart (shown by default)
│   │   │   │   ├── div.empty-cart
│   │   │   │   │   ├── i.empty-cart-icon
│   │   │   │   │   ├── h2
│   │   │   │   │   ├── p
│   │   │   │   │   └── a.btn-primary
│   │   │   └── div#orderSuccessModal (initially hidden)
│   │   │       ├── div.modal-overlay
│   │   │       ├── div.modal-content
│   │   │       │   ├── div.success-animation
│   │   │       │   ├── div.modal-body
│   │   │       │   └── div.modal-actions
│   │   ├── section.newsletter (same as index.html)
│   │   └── footer (same as index.html)
│   └── scripts (same as index.html)
```

### 4. Admin Dashboard (`admin/index.html`) DOM Structure

```
html
├── head (admin-specific CSS and scripts)
├── body
│   ├── script (authentication guard)
│   ├── aside.admin-sidebar
│   │   ├── div.sidebar-header
│   │   │   └── div.logo
│   │   │       └── a[href="index.html"]
│   │   ├── nav.admin-nav
│   │   │   ├── ul
│   │   │   │   ├── li.active
│   │   │   │   │   └── a[href="index.html"] (Dashboard)
│   │   │   │   ├── li
│   │   │   │   │   └── a[href="products.html"] (Products)
│   │   │   │   ├── li
│   │   │   │   │   └── a[href="users.html"] (Users)
│   │   │   │   └── li
│   │   │   │       └── button#logoutButton (Logout)
│   │   └── div.sidebar-footer
│   ├── main.admin-main
│   │   ├── div.admin-header
│   │   │   ├── button.menu-toggle
│   │   │   ├── h1
│   │   │   ├── div.header-actions
│   │   │   │   ├── button#refreshDashboard
│   │   │   │   ├── span#lastUpdated
│   │   │   │   └── button.theme-toggle
│   │   └── div.dashboard-content
│   │       ├── div.dashboard-main-layout
│   │       │   ├── section.recent-products
│   │       │   │   ├── div.section-header
│   │       │   │   └── div.recent-products-grid
│   │       │   └── section.stats-section
│   │       │       ├── div.stats-grid
│   │       │       │   ├── div.stat-card
│   │       │   │   │   ├── div.stat-icon
│   │       │   │   │   ├── div.stat-info
│   │       │   │   │   │   ├── h3#totalUsers
│   │       │   │   │   │   └── p.stat-label
│   │       │   │   ├── div.stat-card
│   │       │   │   │   ├── div.stat-icon
│   │       │   │   │   ├── div.stat-info
│   │       │   │   │   │   ├── h3#totalProducts
│   │       │   │   │   │   └── p.stat-label
│   │       │   │   ├── div.stat-card
│   │       │   │   │   ├── div.stat-icon
│   │       │   │   │   ├── div.stat-info
│   │       │   │   │   │   ├── h3#totalOrders
│   │       │   │   │   │   └── p.stat-label
│   │       │   │   └── div.stat-card
│   │       │   │       ├── div.stat-icon
│   │       │   │       ├── div.stat-info
│   │       │   │       │   ├── h3#totalRevenue
│   │       │   │       │   └── p.stat-label
│   │       └── section.activity-section
│   │           ├── div.section-header
│   │           └── div.activity-list
│   └── scripts
│       ├── script[src="../js/main.js"]
│       ├── script[src="../js/theme.js"]
│       ├── script[src="js/authGuard.js"]
│       ├── script[src="js/auth.js"]
│       ├── script[src="js/admin.js"]
│       └── script (inline dashboard functions)
```

### 5. Admin Login (`admin/login.html`) DOM Structure

```
html
├── head (admin authentication CSS)
├── body.auth-body
│   ├── button#theme-toggle.theme-toggle-btn
│   ├── div.auth-container
│   │   ├── div.auth-card
│   │   │   ├── div.auth-header
│   │   │   │   ├── h2
│   │   │   │   └── p
│   │   │   ├── form#loginForm
│   │   │   │   ├── div.form-group
│   │   │   │   │   ├── label[for="username"]
│   │   │   │   │   └── div.input-group
│   │   │   │   │       ├── i.fas.fa-user
│   │   │   │   │       └── input#username[type="text"]
│   │   │   │   ├── div.form-group
│   │   │   │   │   ├── label[for="password"]
│   │   │   │   │   └── div.input-group
│   │   │   │   │       ├── i.fas.fa-lock
│   │   │   │   │       └── input#password[type="password"]
│   │   │   │   ├── div.form-options
│   │   │   │   │   ├── div.form-check
│   │   │   │   │   │   ├── input#rememberMe[type="checkbox"]
│   │   │   │   │   │   └── label[for="rememberMe"]
│   │   │   │   │   └── a.forgot-password
│   │   │   │   └── button.btn.btn-primary.btn-block[type="submit"]
│   │   │   └── div.auth-footer
│   │   │       └── p
│   │   │           └── a[href="register.html"]
│   └── scripts
│       ├── script[src="../js/theme.js"]
│       └── script[src="js/auth.js"]
```

---

## Backend Architecture

The backend is built with Node.js and Express.js, providing a RESTful API for the e-commerce application.

### Core Components:

**Server Setup (`backend/index.js`):**
- Express application initialization
- Middleware configuration (cors, body-parser, multer)
- Database connection setup with PostgreSQL
- JWT authentication middleware
- File upload handling with Multer
- API route definitions
- Static file serving
- Error handling middleware

**Database Integration:**
- PostgreSQL connection pooling
- SQL query execution
- Data validation and sanitization
- Transaction management

**Authentication:**
- JWT token generation and validation
- Password hashing with bcrypt
- Protected route middleware
- User session management

**File Management:**
- Multer configuration for image uploads
- File validation and size limits
- Static file serving for uploaded images
- Image URL generation

---

## Database Schema

### Tables Structure:

**users table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**products table:**
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    sku VARCHAR(50),
    stock INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `CREATE INDEX idx_products_category ON products(category);`
- `CREATE INDEX idx_products_status ON products(status);`
- `CREATE INDEX idx_products_price ON products(price);`

---

## API Endpoints

### Authentication Endpoints:
- `POST /api/register` - User registration
- `POST /api/login` - User login and token generation

### Product Endpoints:
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/top` - Get top selling products
- `GET /api/products/:id` - Get single product by ID

### Dashboard Endpoints:
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-product` - Get recent products
- `GET /api/sales` - Get sales data for charts

### User Management Endpoints:
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### File Upload Endpoints:
- `POST /api/upload` - Upload product images (admin only)

---

## Admin Panel

The admin panel provides comprehensive management capabilities for the e-commerce platform.

### Features:

**Dashboard:**
- Real-time statistics display
- Sales charts and analytics
- Top products visualization
- Recent activity monitoring
- Auto-refresh functionality

**Product Management:**
- CRUD operations for products
- Image upload and management
- Category and inventory management
- Product status control
- Bulk operations support

**User Management:**
- User account management
- Role-based access control
- User activity monitoring
- Account status management

**Authentication:**
- Secure login system
- JWT-based authentication
- Session management
- Route protection
- Logout functionality

**UI/UX Features:**
- Responsive design
- Dark/light theme support
- Mobile-friendly interface
- Real-time data updates
- Error handling and feedback

---

This complete documentation provides a comprehensive breakdown of the entire e-commerce application, including all HTML, CSS, and JavaScript files with their detailed implementations, DOM tree structures, and complete technical specifications.
