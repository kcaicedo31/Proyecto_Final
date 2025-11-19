let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productosFiltrados = [];

async function cargarProductos() {
    try {
        console.log('Cargando productos...');
        const response = await fetch('/api/productos');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        productos = await response.json();
        console.log('Productos cargados:', productos.length);
        productosFiltrados = [...productos];
        mostrarProductos();
    } catch (error) {
        console.error('Error al cargar productos:', error);
        const container = document.getElementById('products-grid');
        if (container) {
            container.innerHTML = '<p>Error al cargar productos. Verifica que el servidor esté ejecutándose.</p>';
        }
    }
}

function mostrarProductos() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    container.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <h3 class="product-title">${producto.nombre}</h3>
            <p class="product-brand">${producto.marca}</p>
            <p class="product-price">$${parseFloat(producto.precio).toLocaleString()}</p>
            <button class="add-to-cart-btn" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
            </button>
        `;
        container.appendChild(productCard);
    });
}

function filtrarProductos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm) ||
        producto.marca.toLowerCase().includes(searchTerm) ||
        producto.categoria.toLowerCase().includes(searchTerm)
    );
    
    mostrarProductos();
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    }
}

function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    if (cartCount) cartCount.textContent = carrito.length;
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        
        carrito.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${item.marca}</p>
                    <p class="cart-item-price">$${parseFloat(item.precio).toLocaleString()}</p>
                </div>
                <button class="remove-item" onclick="removerDelCarrito(${index})">×</button>
            `;
            cartItems.appendChild(cartItem);
            total += parseFloat(item.precio);
        });
        
        if (totalAmount) totalAmount.textContent = total.toLocaleString();
    }
}

function removerDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function mostrarNotificacion(mensaje) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = mensaje;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function abrirCarrito() {
    document.getElementById('cart-modal').style.display = 'block';
    actualizarCarrito();
}

function cerrarCarrito() {
    document.getElementById('cart-modal').style.display = 'none';
}

function procederAlPago() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + parseFloat(item.precio), 0);
    alert(`¡Compra realizada! Total: $${total.toLocaleString()}`);
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    cerrarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    actualizarCarrito();
    
    document.getElementById('search-input').addEventListener('input', filtrarProductos);
    document.getElementById('cart-btn').addEventListener('click', abrirCarrito);
    document.querySelector('.close').addEventListener('click', cerrarCarrito);
    document.getElementById('checkout-btn').addEventListener('click', procederAlPago);
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            cerrarCarrito();
        }
    });
});