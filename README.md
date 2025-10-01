# E-commerce Application

A full-stack e-commerce application built with Node.js, PostgreSQL, and vanilla JavaScript. Features a complete admin panel for product management and a responsive frontend for customers.

## 🚀 Features

### Admin Panel
- **Product Management**: Add, edit, delete products with image upload
- **Admin Dashboard**: Real-time statistics and charts
- **User Management**: View and manage admin users
- **Authentication**: Secure JWT-based login system
- **Theme Support**: Dark/light mode toggle

### Frontend Features
- **Product Catalog**: Browse products with responsive design
- **Shopping Cart**: Add products to cart with quantity management
- **Category Filtering**: Filter products by category
- **Search Functionality**: Find products quickly
- **Responsive Design**: Works on desktop, tablet, and mobile

### Technical Features
- **Database Integration**: PostgreSQL with proper schema
- **File Upload**: Multer-based image upload system
- **API Endpoints**: RESTful API for all operations
- **CORS Enabled**: Cross-origin resource sharing
- **Auto-migration**: Database schema updates on server start

## 📋 Prerequisites

- **Node.js**: v14 or higher
- **PostgreSQL**: v12 or higher
- **npm or yarn**: Package manager
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation & Setup

### Step 1: Database Setup

1. **Install PostgreSQL** if not already installed
2. **Open PostgreSQL terminal** (psql) and create the database:
   ```sql
   CREATE DATABASE e_commerce_db;
   ```

3. **Verify database creation**:
   ```sql
   \l  -- List all databases
   ```

### Step 2: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create/edit the `.env` file with your database credentials:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_DATABASE=e_commerce_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Initialize the database**:
   ```bash
   psql -U postgres -d e_commerce_db -f init-db.sql
   ```
   *Note: Replace `postgres` with your PostgreSQL username if different*

5. **Start the backend server**:
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Open the application**:
   - **Option 1**: Open `index.html` directly in your web browser
   - **Option 2**: Use VS Code Live Server extension
   - **Option 3**: Use any local development server

## 🔐 Admin Panel Access

### Login Credentials
- **URL**: `http://localhost:3000/admin/login.html`
- **Username**: `admin`
- **Password**: `admin123`

### Admin Features

1. **Dashboard**:
   - Real-time statistics (users, products, orders, revenue)
   - Interactive charts and graphs
   - Recent activity and products

2. **Product Management**:
   - View all products in a table
   - Add new products with image upload
   - Edit existing products
   - Delete products
   - Product fields: Name, Description, Price, Image URL

3. **User Management**:
   - View all admin users
   - User columns: ID, Username, Admin status

## 📖 Usage Guide

### For Administrators

#### Adding Products
1. Login to admin panel
2. Navigate to **Products** page
3. Click **"Add New Product"** button
4. Fill in product details:
   - **Product Name**: Required field
   - **Description**: Product details
   - **Price**: Numeric value (e.g., 19.99)
   - **Image**: Upload product image
5. Click **"Save Product"**

#### Managing Products
- **Edit**: Click the edit button on any product row
- **Delete**: Click the delete button to remove a product
- **View**: All products are displayed in a responsive table

### For Customers

#### Browsing Products
1. Open the main website (`index.html`)
2. View all products on the homepage
3. Click on products to see details
4. Use the cart to add items

#### Shopping Cart
- **Add to Cart**: Click "Add to Cart" on any product
- **View Cart**: Cart icon shows total items
- **Manage Quantities**: Increase/decrease item quantities

## 🗂️ Project Structure

```
├── backend/
│   ├── index.js              # Main Express server
│   ├── init-db.sql           # Database initialization
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   ├── uploads/              # Uploaded product images
│   └── node_modules/         # Node.js packages
├── frontend/
│   ├── admin/                # Admin panel
│   │   ├── index.html        # Admin dashboard
│   │   ├── login.html        # Admin login
│   │   ├── products.html     # Product management
│   │   ├── users.html        # User management
│   │   ├── css/              # Admin styles
│   │   │   └── admin.css     # Admin panel CSS
│   │   └── js/               # Admin scripts
│   ├── css/                  # Frontend styles
│   │   ├── main.css          # Main styles
│   │   ├── cart.css          # Cart page styles
│   │   ├── products.css      # Product page styles
│   │   └── ...               # Other CSS files
│   ├── js/                   # Frontend scripts
│   │   ├── main.js           # Main frontend logic
│   │   ├── dataManager.js    # API communication
│   │   └── theme.js          # Theme toggle
│   ├── index.html            # Homepage
│   ├── products.html         # Product catalog
│   ├── cart.html             # Shopping cart
│   ├── about.html            # About page
│   └── contact.html          # Contact page
└── README.md                 # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - Admin login
- `POST /api/register` - Register new admin

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Users
- `GET /api/users` - Get all users (admin only)

### File Upload
- `POST /api/upload` - Upload product images (admin only)

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Errors
**Problem**: Backend fails to connect to PostgreSQL
**Solutions**:
- Ensure PostgreSQL service is running
- Verify database credentials in `.env` file
- Check if `e_commerce_db` database exists
- Confirm PostgreSQL is running on port 5432

#### 2. Image Upload Fails
**Problem**: Cannot upload product images
**Solutions**:
- Ensure backend server is running on port 5000
- Check if `uploads` directory exists in backend folder
- Verify file permissions for uploads directory
- Check browser console for error messages

#### 3. Products Not Displaying
**Problem**: Products not showing on frontend
**Solutions**:
- Verify backend server is accessible
- Check browser console for API errors
- Ensure database has sample products
- Clear browser cache and reload

#### 4. Admin Login Fails
**Problem**: Cannot login to admin panel
**Solutions**:
- Ensure database is initialized with admin user
- Verify username: `admin`, password: `admin123`
- Check JWT_SECRET in environment variables
- Clear browser localStorage and try again

#### 5. CORS Errors
**Problem**: Frontend cannot access backend API
**Solutions**:
- Ensure backend server is running
- Check CORS configuration in backend
- Verify API URLs are correct (should be `http://localhost:5000`)

### Development Tips

- **Hot Reload**: Use `nodemon` instead of `npm start` for auto-restart
- **Debug Mode**: Set `DEBUG=app:*` in environment for detailed logs
- **Database Queries**: Use `console.log` to debug SQL queries
- **Frontend Debug**: Use browser developer tools for JavaScript debugging

## 🔒 Security Notes

### Production Deployment
- **Change Default Password**: Update the default admin password
- **Environment Variables**: Use strong JWT_SECRET in production
- **File Upload Validation**: Implement proper file type and size validation
- **Rate Limiting**: Add rate limiting to API endpoints
- **HTTPS**: Use HTTPS in production environment
- **Database Security**: Use strong database passwords
- **CORS Configuration**: Restrict CORS to specific domains

### Development Security
- **Environment Files**: Never commit `.env` files to version control
- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Tokens expire after 24 hours
- **Input Validation**: Validate all user inputs
- **SQL Injection**: Use parameterized queries

## 🚀 Deployment

### Local Development
1. Follow the installation steps above
2. Both frontend and backend run locally
3. Frontend: `http://localhost:3000` (or file:// protocol)
4. Backend: `http://localhost:5000`

### Production Deployment
- **Backend**: Deploy to Node.js hosting (Heroku, AWS, DigitalOcean)
- **Frontend**: Deploy to static hosting (Netlify, Vercel, GitHub Pages)
- **Database**: Use managed PostgreSQL service
- **Environment**: Set production environment variables
- **Domain**: Configure custom domain and SSL certificates

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the API documentation

---

**Built with ❤️ using Node.js, PostgreSQL, and vanilla JavaScript**
