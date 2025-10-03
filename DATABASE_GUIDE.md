# PostgreSQL Database Setup Guide for E-commerce Project

This guide will walk you through setting up PostgreSQL and integrating it with your Node.js/Express.js E-commerce project.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- PostgreSQL installed on your system
- psql command-line tool (comes with PostgreSQL installation)

## 1. PostgreSQL Setup

### Installing PostgreSQL
1. Download and install PostgreSQL from the official website: https://www.postgresql.org/download/
2. During installation, remember the following:
   - Note down the port number (default is 5432)
   - Remember the password you set for the postgres superuser
   - Make sure to include pgAdmin (optional but useful for database management)

### Creating a New Database
1. Open psql shell (search for "SQL Shell (psql)" in your applications)
2. Connect to the default database with the postgres user:
   ```
   Server [localhost]: 
   Database [postgres]: 
   Port [5432]: 
   Username [postgres]: 
   Password for user postgres: [enter your password]
   ```

3. Once connected, create a new database for your project:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

4. Create a new user for your application (recommended for security):
   ```sql
   CREATE USER ecommerce_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
   ```

## 2. Database Schema Setup

Your project already has a database initialization script at `backend/init-db.sql`. Here's the current schema:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url VARCHAR(255)
);

-- Insert default admin user (username: admin, password: password)
INSERT INTO users (username, password, is_admin) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true)
ON CONFLICT (username) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
```

### Applying the Schema
1. First, create the database:
   ```bash
   createdb -U your_username ecommerce_db
   ```
```bash
npm install pg express dotenv bcrypt jsonwebtoken multer cors
```

### Environment Configuration
Create a `.env` file in your project root (add it to .gitignore):
```
DB_USER=your_db_username
DB_HOST=localhost
DB_DATABASE=ecommerce_db
DB_PASSWORD=your_secure_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

### Database Connection Setup
Your project already has the database connection configured in `backend/index.js`. Here's how it works:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
```

### Example Query
Here's how to execute a query in your routes:

```javascript
// Example route to get all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

## 4. Database Operations

### User Authentication
Your project uses JWT for authentication. Here's how it works:

```javascript
// Register a new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, is_admin',
            [username, hashedPassword]
        );
        const user = result.rows[0];
        const token = generateToken(user);
        res.json({ token, user: { id: user.id, username: user.username, is_admin: user.is_admin } });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});
```

### File Uploads
Your project is configured to handle file uploads with Multer:

```javascript
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => 
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Example route for file upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});
```

## 5. Database Migrations

For managing database schema changes, you can use `node-pg-migrate`:

1. Install node-pg-migrate:
   ```bash
   npm install --save-dev node-pg-migrate
   ```

2. Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "migrate": "node-pg-migrate",
     "migrate:create": "node-pg-migrate create"
   }
   ```

3. Create a migration:
   ```bash
   npm run migrate:create add_orders_table
   ```

4. Edit the created migration file in the `migrations` directory

5. Run migrations:
   ```bash
   DATABASE_URL=postgres://username:password@localhost:5432/ecommerce_db npm run migrate up
   ```

## 6. Security Best Practices

1. **Environment Variables**: Always use environment variables for sensitive data (DB credentials, JWT secret, etc.)
2. **Password Hashing**: Your project already uses bcrypt for password hashing
3. **Input Validation**: Always validate and sanitize user input
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure CORS properly (your project already has this set up)
6. **File Uploads**:
   - Validate file types
   - Set file size limits (already set to 5MB)
   - Store files outside the web root
   - Use unique filenames (already implemented)

## 6. Backing Up Your Database

To create a backup:
```bash
pg_dump -U ecommerce_user -d ecommerce_db > ecommerce_backup_$(date +%Y%m%d).sql
```

To restore from backup:
```bash
psql -U ecommerce_user -d ecommerce_db < ecommerce_backup_20231002.sql
```

## 7. Common psql Commands

- Connect to database: `psql -U username -d database_name`
- List databases: `\l`
- Connect to a database: `\c database_name`
- List tables: `\dt`
- Describe a table: `\d table_name`
- Quit psql: `\q`

## 8. Security Best Practices

1. Never commit database credentials to version control
2. Use environment variables for sensitive information
3. Implement proper user roles and permissions
4. Regularly backup your database
5. Use parameterized queries to prevent SQL injection

## 9. Troubleshooting

- **Connection refused**: Ensure PostgreSQL is running and the port is correct
- **Authentication failed**: Double-check username and password
- **Permission denied**: Verify the user has proper privileges on the database
- **Table doesn't exist**: Make sure you've created the tables and are connected to the right database

## 10. Next Steps

1. Implement user authentication
2. Set up database indexes for frequently queried columns
3. Consider database connection pooling for production
4. Set up regular database maintenance tasks
5. Implement database monitoring

For more detailed information, refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/).
