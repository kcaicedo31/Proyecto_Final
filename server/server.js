require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Variables de entorno:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('SERVER_PORT:', PORT);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sportshop_db',
    port: process.env.DB_PORT || 3306
});

connection.connect((error) => {
    if (error) {
        console.log('Error de conexión a MySQL:', error);
        return;
    }
    console.log('Conectado a la base de datos');
});

app.get('/api/productos', (req, res) => {
    console.log('Solicitud recibida para obtener productos');
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error en consulta:', error);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        console.log('Productos encontrados:', results.length);
        res.json(results);
    });
});

app.get('/api/productos/buscar', (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Parámetro de búsqueda requerido' });
    }
    
    const query = 'SELECT * FROM productos WHERE nombre LIKE ? OR marca LIKE ? OR categoria LIKE ?';
    const searchTerm = `%${q}%`;
    
    connection.query(query, [searchTerm, searchTerm, searchTerm], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en búsqueda' });
        }
        res.json(results);
    });
});

app.get('/api/productos/filtrar', (req, res) => {
    const { categoria, ordenar } = req.query;
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params = [];

    if (categoria && categoria !== 'all') {
        query += ' AND categoria = ?';
        params.push(categoria);
    }

    if (ordenar === 'price-low') {
        query += ' ORDER BY precio ASC';
    } else if (ordenar === 'price-high') {
        query += ' ORDER BY precio DESC';
    } else {
        query += ' ORDER BY nombre ASC';
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al filtrar productos' });
        }
        res.json(results);
    });
});

app.get('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';
    
    connection.query(query, [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener producto' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json(results[0]);
    });
});

app.post('/api/productos', (req, res) => {
    const { nombre, marca, precio, imagen, categoria, stock = 0, descripcion = '' } = req.body;
    
    if (!nombre || !marca || !precio || !categoria) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    
    const query = 'INSERT INTO productos (nombre, marca, precio, imagen, categoria, stock, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [nombre, marca, precio, imagen, categoria, stock, descripcion], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear producto' });
        }
        
        res.status(201).json({
            mensaje: 'Producto creado',
            id: results.insertId
        });
    });
});

app.put('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const { nombre, marca, precio, imagen, categoria, stock, descripcion } = req.body;
    
    const query = 'UPDATE productos SET nombre = ?, marca = ?, precio = ?, imagen = ?, categoria = ?, stock = ?, descripcion = ? WHERE id = ?';
    
    connection.query(query, [nombre, marca, precio, imagen, categoria, stock, descripcion, productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({ mensaje: 'Producto actualizado' });
    });
});

app.delete('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM productos WHERE id = ?';
    
    connection.query(query, [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({ mensaje: 'Producto eliminado' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
