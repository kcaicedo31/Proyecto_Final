-- Crear base de datos
CREATE DATABASE IF NOT EXISTS sportshop_db;
USE sportshop_db;

-- Crear tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(500),
    categoria VARCHAR(100) NOT NULL,
    stock INT DEFAULT 0,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar productos iniciales
INSERT INTO productos (nombre, marca, precio, imagen, categoria, stock, descripcion) VALUES
('Air Max 270', 'Nike', 129990, 'Images/NikeAir270.jpeg', 'calzado', 15, 'Zapatillas deportivas con tecnología Air Max'),
('Ultraboost 22', 'Adidas', 149990, 'Images/AdidasUltraboost22.jpeg', 'calzado', 12, 'Zapatillas de running con tecnología Boost'),
('RS-X', 'Puma', 119990, 'Images/PumaRS-X.jpeg', 'calzado', 8, 'Zapatillas lifestyle con diseño retro-futurista'),
('990v5', 'New Balance', 179990, 'Images/NewBalance990v5.jpeg', 'calzado', 10, 'Zapatillas premium Made in USA'),

('Camiseta Dri-FIT', 'Nike', 39990, 'Images/CamisetaDri-FIT.jpeg', 'ropa', 25, 'Camiseta deportiva con tecnología Dri-FIT'),
('Sudadera Originals', 'Adidas', 79990, 'Images/SudaderaAdidasOriginals.jpeg', 'ropa', 18, 'Sudadera clásica con logo trefoil'),
('Shorts Under Armour', 'Under Armour', 49990, 'Images/ShortsUnderArmour.jpeg', 'ropa', 20, 'Shorts deportivos con tecnología HeatGear'),
('Leggings', 'Lululemon', 89990, 'Images/LeggingsLululemon.jpeg', 'ropa', 15, 'Leggings de yoga y entrenamiento'),

('Balón FIFA', 'Wilson', 89990, 'Images/PelotaFIFAWilson.jpeg', 'equipamiento', 30, 'Balón oficial FIFA para fútbol'),
('Raqueta Pro Staff', 'Wilson', 299990, 'Images/RaquetaWilsonProStaff.jpeg', 'equipamiento', 8, 'Raqueta profesional de tenis'),
('Guantes Pro', 'Everlast', 69990, 'Images/GuantesEverlastPro.jpeg', 'equipamiento', 12, 'Guantes de boxeo profesionales'),
('Bicicleta Mountain', 'Trek', 1299990, 'Images/BicicletaTrekMountain.jpeg', 'equipamiento', 5, 'Bicicleta de montaña Trek'),

('Mancuernas 20kg', 'Bowflex', 199990, 'Images/MancuernasBowflex20kg.jpeg', 'fitness', 10, 'Set de mancuernas ajustables'),
('Banda Elástica', 'TRX', 29990, 'Images/BandaElasticaTRX.png', 'fitness', 25, 'Banda de resistencia para entrenamiento'),
('Esterilla Yoga', 'Manduka', 79990, 'Images/EsterillaYogaManduka.jpeg', 'fitness', 15, 'Esterilla premium para yoga'),
('Kettlebell 16kg', 'Kettlebell', 89990, 'Images/Kettlebell16kg.jpeg', 'fitness', 12, 'Pesa rusa de hierro fundido');

-- Crear tabla carrito (opcional para futuras funcionalidades)
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT DEFAULT 1,
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Crear tabla pedidos (opcional para futuras funcionalidades)
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    metodo_pago VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);