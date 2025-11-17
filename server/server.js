const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sportshop_db'
});

connection.connect((error) => {
    if (error) {
        console.log('Error de conexión a MySQL:', error);
        return;
    }
    console.log('Conectado a la base de datos');
});

app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
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
    const { nombre, marca, precio, imagen, categoria } = req.body;
    
    if (!nombre || !marca || !precio) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    
    const query = 'INSERT INTO productos (nombre, marca, precio, imagen, categoria) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(query, [nombre, marca, precio, imagen, categoria], (error, results) => {
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
    const { nombre, marca, precio, imagen, categoria } = req.body;
    
    const query = 'UPDATE productos SET nombre = ?, marca = ?, precio = ?, imagen = ?, categoria = ? WHERE id = ?';
    
    connection.query(query, [nombre, marca, precio, imagen, categoria, productId], (error, results) => {
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
