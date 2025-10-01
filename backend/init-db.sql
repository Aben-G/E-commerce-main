-- E-commerce Database Initialization Script
-- Simple schema for e-commerce application

-- Create database if it doesn't exist (run this manually in psql)
-- CREATE DATABASE e_commerce_db;

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url VARCHAR(255)
);

-- Insert sample admin user (password: admin123)
-- Note: This is a bcrypt hash of 'admin123'
INSERT INTO users (username, password, is_admin) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true)
ON CONFLICT (username) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, image_url) VALUES
('Sample Product 1', 'This is a sample product description', 19.99, '/images/sample1.jpg'),
('Sample Product 2', 'Another sample product for testing', 29.99, '/images/sample2.jpg')
ON CONFLICT DO NOTHING;

-- Create basic indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
