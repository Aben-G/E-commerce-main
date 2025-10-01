require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Multer and uploads setup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
app.use('/uploads', express.static(uploadsDir));

// Auth helpers
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '2h' });
}

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.is_admin) return res.status(403).json({ error: 'Not authorized' });
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Routes
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id, username, is_admin',
            [username, hashed, true]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Username already exists' });
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user || !user.is_admin) return res.status(401).json({ error: 'Invalid credentials or not admin' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });
        res.json({ token: generateToken(user) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload endpoint (protected)
app.post('/api/upload', authenticateAdmin, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
});

// Products endpoints
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', authenticateAdmin, async (req, res) => {
    const { name, description, price, image_url, sku, category, stock, status } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Name and price required' });
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, image_url, sku, category, stock, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
            [name, description, price, image_url, sku || null, category || null, stock || 0, status !== false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', authenticateAdmin, async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price, image_url, sku, category, stock, status } = req.body;
    if (isNaN(productId)) return res.status(400).json({ error: 'Invalid product ID' });
    if (!name || !price) return res.status(400).json({ error: 'Name and price required' });
    try {
        const result = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, sku=$5, category=$6, stock=$7, status=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *',
            [name, description, price, image_url, sku || null, category || null, stock || 0, status !== false, productId]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', authenticateAdmin, async (req, res) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) return res.status(400).json({ error: 'Invalid product ID' });
    try {
        const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [productId]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully', product: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) return res.status(400).json({ error: 'Invalid product ID' });
    try {
        const result = await pool.query('SELECT * FROM products WHERE id=$1', [productId]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dashboard endpoints
app.get('/api/dashboard/stats', authenticateAdmin, async (req, res) => {
    try {
        // Get total users
        const usersResult = await pool.query('SELECT COUNT(*) as count FROM users');

        // Get total products
        const productsResult = await pool.query('SELECT COUNT(*) as count FROM products');

        res.json({
            totalUsers: parseInt(usersResult.rows[0].count) || 0,
            totalProducts: parseInt(productsResult.rows[0].count) || 0
        });
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

// Get most recent product
app.get('/api/dashboard/recent-product', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY id DESC LIMIT 1'
        );
        
        if (result.rows.length === 0) {
            return res.json({ product: null });
        }
        
        res.json({ product: result.rows[0] });
    } catch (err) {
        console.error('Error fetching recent product:', err);
        res.status(500).json({ error: 'Failed to fetch recent product' });
    }
});

// Get sales data for charts
app.get('/api/sales', authenticateAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const salesData = [];
        const labels = [];

        // Generate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        // Format dates for query
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        // Get sales data grouped by date
        const result = await pool.query(
            `SELECT 
                DATE(created_at) as date, 
                COALESCE(SUM(total_amount), 0) as total 
             FROM orders 
             WHERE created_at BETWEEN $1 AND $2 
             GROUP BY DATE(created_at) 
             ORDER BY date`,
            [startDateStr, endDateStr]
        );

        // Create a map of date to sales
        const salesMap = new Map();
        result.rows.forEach(row => {
            salesMap.set(row.date.toISOString().split('T')[0], parseFloat(row.total));
        });

        // Fill in missing dates with 0
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            labels.push(
                currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            );
            salesData.push(salesMap.get(dateStr) || 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        res.json({
            labels,
            data: salesData
        });
    } catch (err) {
        console.error('Error fetching sales data:', err);
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});

// Get top selling products
app.get('/api/products/top', authenticateAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const result = await pool.query(
            `SELECT 
                p.id, 
                p.name, 
                p.price, 
                p.image_url,
                COUNT(oi.id) as sold,
                SUM(oi.quantity * oi.price) as revenue
             FROM products p
             LEFT JOIN order_items oi ON p.id = oi.product_id
             GROUP BY p.id, p.name, p.price, p.image_url
             ORDER BY sold DESC, revenue DESC
             LIMIT $1`,
            [limit]
        );

        res.json(result.rows.map(row => ({
            ...row,
            sold: parseInt(row.sold) || 0,
            revenue: parseFloat(row.revenue) || 0
        })));
    } catch (err) {
        console.error('Error fetching top products:', err);
        res.status(500).json({ error: 'Failed to fetch top products' });
    }
});

// User management endpoints
app.get('/api/users', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, is_admin FROM users ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', authenticateAdmin, async (req, res) => {
    const { username, password, is_admin } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, is_admin) VALUES ($1,$2,$3) RETURNING id, username, is_admin',
            [username, hashedPassword, is_admin || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Username already exists' });
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const { username, password, is_admin } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });
    try {
        let query = 'UPDATE users SET username=$1, is_admin=$2';
        const params = [username, is_admin || false];
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password=$3';
            params.push(hashedPassword);
        }
        query += ' WHERE id=$' + (params.length + 1) + ' RETURNING id, username, is_admin';
        params.push(parseInt(id));
        const result = await pool.query(query, params);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Username already exists' });
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' });
    try {
        const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING id, username', [parseInt(id)]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve static frontend
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.use('/admin', express.static(path.join(frontendPath, 'admin')));
app.get("/api/products", (req, res) => {
    res.json({ message: "Products endpoint working" });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
const HOST = 'http://localhost';

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Main Website: ${HOST}:${PORT}`);
    console.log(`Admin Panel: ${HOST}:${PORT}/admin`);
});
