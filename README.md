# E-commerce Application

A full-stack e-commerce application with admin panel for product management.

## Features

- **Admin Panel**: Add, edit, and manage products with image upload
- **Product Catalog**: Browse products with categories and filtering
- **Shopping Cart**: Add products to cart and manage quantities
- **Image Upload**: Upload and display product images
- **Database Integration**: PostgreSQL database with proper schema
- **Authentication**: Admin login system with JWT tokens

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database:**
   - Create a database named `e_commerce_db`
   - Update the `.env` file with your database credentials:
     ```
     DB_USER=postgres
     DB_HOST=localhost
     DB_DATABASE=e_commerce_db
     DB_PASSWORD=your_password
     DB_PORT=5432
     PORT=5000
     ```

4. **Initialize the database:**
   ```bash
   psql -U postgres -d e_commerce_db -f init-db.sql
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open the application:**
   - Open `index.html` in a web browser
   - Or use a local server like Live Server in VS Code

### Admin Panel Access

1. **Navigate to admin panel:**
   ```
   http://localhost:3000/admin/login.html
   ```

2. **Login credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Database Migration:**
   - Click the "Migrate DB" button in the admin products page to ensure the database schema is up to date

## Usage

### Adding Products (Admin)

1. Login to the admin panel
2. Go to Products page
3. Click "Migrate DB" if this is your first time
4. Click "Add New Product"
5. Fill in all product details:
   - Product Name
   - SKU (unique identifier)
   - Category
   - Price
   - Stock quantity
   - Description
   - Upload an image
6. Click "Save Product"

### Viewing Products (Client)

1. Open the main website (`index.html`)
2. Products added through the admin panel will automatically appear
3. Browse by categories or view all products
4. Add products to cart

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)

### Authentication
- `POST /api/login` - Admin login
- `POST /api/register` - Register new admin

### File Upload
- `POST /api/upload` - Upload product images (admin only)

### Database
- `POST /api/migrate` - Run database migration (admin only)

## File Structure

```
├── backend/
│   ├── index.js          # Main server file
│   ├── init-db.sql       # Database initialization script
│   ├── .env              # Environment variables
│   └── uploads/          # Uploaded images directory
├── frontend/
│   ├── admin/            # Admin panel files
│   │   ├── products.html # Product management
│   │   └── login.html    # Admin login
│   ├── js/
│   │   ├── main.js       # Main frontend logic
│   │   └── dataManager.js # API communication
│   ├── index.html        # Main homepage
│   └── products.html     # Product catalog
└── README.md
```

## Troubleshooting

### Common Issues

1. **Database connection errors:**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **Image upload fails:**
   - Check backend server is running on port 5000
   - Ensure uploads directory exists and is writable

3. **Products not showing:**
   - Run database migration from admin panel
   - Check browser console for API errors
   - Verify backend server is accessible

4. **Admin login fails:**
   - Ensure database is initialized with sample admin user
   - Check username: `admin`, password: `admin123`

### Development Notes

- The application uses JWT tokens for admin authentication
- Images are stored in the `backend/uploads` directory
- Product data is cached in the frontend for 5 minutes
- All API calls include CORS headers for development

## Security Notes

- Change the default admin password in production
- Update JWT_SECRET in production environment
- Implement proper file upload validation
- Add rate limiting for API endpoints
- Use HTTPS in production
