// Productos deportivos expandidos
const productos = [
    // Calzado
    { id: 1, nombre: "Nike Air Max 270", precio: 600000, categoria: "calzado", marca: "Nike", imagen: "Images/NikeAir270.jpeg", valoracion: 4.5, inventario: 15 },
    { id: 2, nombre: "Adidas Ultraboost 22", precio: 720000, categoria: "calzado", marca: "Adidas", imagen: "Images/AdidasUltraboost22.jpeg", valoracion: 4.7, inventario: 8 },
    { id: 3, nombre: "Puma RS-X", precio: 440000, categoria: "calzado", marca: "Puma", imagen: "Images/PumaRS-X.jpeg", valoracion: 4.2, inventario: 12 },
    { id: 4, nombre: "New Balance 990v5", precio: 700000, categoria: "calzado", marca: "New Balance", imagen: "Images/NewBalance990v5.jpeg", valoracion: 4.6, inventario: 6 },
    
    // Ropa
    { id: 5, nombre: "Camiseta Dri-FIT Nike", precio: 140000, categoria: "ropa", marca: "Nike", imagen: "Images/CamisetaDri-FITNike.jpeg", valoracion: 4.3, inventario: 25 },
    { id: 6, nombre: "Sudadera Adidas Originals", precio: 260000, categoria: "ropa", marca: "Adidas", imagen: "Images/SudaderaAdidasOriginals.jpeg", valoracion: 4.4, inventario: 18 },
    { id: 7, nombre: "Shorts Under Armour", precio: 160000, categoria: "ropa", marca: "Under Armour", imagen: "Images/ShortsUnderArmour.jpeg", valoracion: 4.1, inventario: 20 },
    { id: 8, nombre: "Leggings Lululemon", precio: 392000, categoria: "ropa", marca: "Lululemon", imagen: "Images/Leggings Lululemon.jpeg", valoracion: 4.8, inventario: 10 },
    
    // Equipamiento
    { id: 9, nombre: "Pelota FIFA Wilson", precio: 180000, categoria: "equipamiento", marca: "Wilson", imagen: "Images/PelotaFIFAWilson.jpeg", valoracion: 4.5, inventario: 30 },
    { id: 10, nombre: "Raqueta Wilson Pro Staff", precio: 880000, categoria: "equipamiento", marca: "Wilson", imagen: "Images/RaquetaWilsonProStaff.jpeg", valoracion: 4.7, inventario: 5 },
    { id: 11, nombre: "Guantes Everlast Pro", precio: 340000, categoria: "equipamiento", marca: "Everlast", imagen: "Images/GuantesEverlastPro.jpeg", valoracion: 4.4, inventario: 14 },
    { id: 12, nombre: "Bicicleta Trek Mountain", precio: 4800000, categoria: "equipamiento", marca: "Trek", imagen: "Images/BicicletaTrekMountain.jpeg", valoracion: 4.9, inventario: 3 },
    
    // Fitness
    { id: 13, nombre: "Mancuernas Bowflex 20kg", precio: 480000, categoria: "fitness", marca: "Bowflex", imagen: "Images/MancuernasBowflex20kg.jpeg", valoracion: 4.6, inventario: 8 },
    { id: 14, nombre: "Banda Elástica TRX", precio: 220000, categoria: "fitness", marca: "TRX", imagen: "Images/BandaElásticaTRX.png", valoracion: 4.3, inventario: 22 },
    { id: 15, nombre: "Esterilla Yoga Manduka", precio: 300000, categoria: "fitness", marca: "Manduka", imagen: "Images/EsterillaYogaManduka.jpeg", valoracion: 4.7, inventario: 16 },
    { id: 16, nombre: "Kettlebell 16kg", precio: 260000, categoria: "fitness", marca: "CAP", imagen: "Images/Kettlebell16kg.jpeg", valoracion: 4.5, inventario: 12 }
];

const categorias = [
    { id: 'todos', nombre: 'Todos los productos' },
    { id: 'calzado', nombre: 'Calzado' },
    { id: 'ropa', nombre: 'Ropa Deportiva' },
    { id: 'equipamiento', nombre: 'Equipamiento' },
    { id: 'fitness', nombre: 'Fitness' }
];

const marcas = ['Todos', 'Nike', 'Adidas', 'Puma', 'New Balance', 'Under Armour', 'Wilson', 'Everlast', 'Trek', 'Bowflex', 'TRX', 'Manduka', 'CAP', 'Lululemon'];

let carrito = [];
let productosFiltrados = [...productos];

// Elementos DOM
const rejillaProductos = document.getElementById('products-grid');
const modalCarrito = document.getElementById('cart-modal');
const botonCarrito = document.getElementById('cart-btn');
const contadorCarrito = document.getElementById('cart-count');
const elementosCarrito = document.getElementById('cart-items');
const montoTotal = document.getElementById('total-amount');
const cerrarModal = document.querySelector('.close');
const entradaBusqueda = document.getElementById('search-input');
const botonBusqueda = document.getElementById('search-btn');
const botonPagar = document.getElementById('checkout-btn');

// Renderizar productos con información completa
function mostrarProductos(listaProductos = productosFiltrados) {
    rejillaProductos.innerHTML = '';
    
    if (listaProductos.length === 0) {
        rejillaProductos.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No se encontraron productos</p>';
        return;
    }
    
    listaProductos.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'product-card';
        const estrellas = '★'.repeat(Math.floor(producto.valoracion)) + '☆'.repeat(5 - Math.floor(producto.valoracion));
        const estadoInventario = producto.inventario > 0 ? `Stock: ${producto.inventario}` : 'Sin stock';
        const claseInventario = producto.inventario > 0 ? 'in-stock' : 'out-stock';
        
        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="brand">${producto.marca}</p>
                <div class="rating">
                    <span class="stars">${estrellas}</span>
                    <span class="rating-value">(${producto.valoracion})</span>
                </div>
                <p class="price">$${producto.precio.toLocaleString('es-CO')}</p>
                <p class="stock ${claseInventario}">${estadoInventario}</p>
                <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})" ${producto.inventario === 0 ? 'disabled' : ''}>
                    ${producto.inventario > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
            </div>
        `;
        rejillaProductos.appendChild(tarjetaProducto);
    });
}

// Agregar al carrito con validación de stock
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const elementoExistente = carrito.find(elemento => elemento.id === idProducto);
    
    if (producto.inventario === 0) {
        alert('Producto sin stock');
        return;
    }
    
    const cantidadActual = elementoExistente ? elementoExistente.cantidad : 0;
    if (cantidadActual >= producto.inventario) {
        alert(`Solo hay ${producto.inventario} unidades disponibles`);
        return;
    }
    
    if (elementoExistente) {
        elementoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarInterfazCarrito();
    mostrarMensajeAgregado(producto.nombre);
}

function mostrarMensajeAgregado(nombreProducto) {
    const mensaje = document.createElement('div');
    mensaje.className = 'cart-message';
    mensaje.textContent = `${nombreProducto} agregado al carrito`;
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        mensaje.classList.remove('show');
        setTimeout(() => mensaje.remove(), 300);
    }, 2000);
}

// Actualizar interfaz del carrito
function actualizarInterfazCarrito() {
    contadorCarrito.textContent = carrito.reduce((total, elemento) => total + elemento.cantidad, 0);
    mostrarElementosCarrito();
    actualizarTotal();
}

// Renderizar items del carrito
function mostrarElementosCarrito() {
    elementosCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        elementosCarrito.innerHTML = '<p style="text-align: center; padding: 20px;">El carrito está vacío</p>';
        return;
    }
    
    carrito.forEach(elemento => {
        const elementoCarrito = document.createElement('div');
        elementoCarrito.className = 'cart-item';
        elementoCarrito.innerHTML = `
            <img src="${elemento.imagen}" alt="${elemento.nombre}">
            <div class="item-info">
                <h4>${elemento.nombre}</h4>
                <p>$${elemento.precio.toLocaleString('es-CO')} c/u</p>
            </div>
            <div class="item-controls">
                <button class="quantity-btn" onclick="cambiarCantidad(${elemento.id}, -1)">-</button>
                <span>${elemento.cantidad}</span>
                <button class="quantity-btn" onclick="cambiarCantidad(${elemento.id}, 1)">+</button>
                <button class="remove-btn" onclick="eliminarDelCarrito(${elemento.id})">Eliminar</button>
            </div>
            <div>
                <strong>$${(elemento.precio * elemento.cantidad).toLocaleString('es-CO')}</strong>
            </div>
        `;
        elementosCarrito.appendChild(elementoCarrito);
    });
}

// Cambiar cantidad con validación de stock
function cambiarCantidad(idProducto, cambio) {
    const elemento = carrito.find(elemento => elemento.id === idProducto);
    const producto = productos.find(p => p.id === idProducto);
    
    if (elemento) {
        const nuevaCantidad = elemento.cantidad + cambio;
        
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
        } else if (nuevaCantidad > producto.inventario) {
            alert(`Solo hay ${producto.inventario} unidades disponibles`);
        } else {
            elemento.cantidad = nuevaCantidad;
            actualizarInterfazCarrito();
        }
    }
}

// Eliminar del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(elemento => elemento.id !== idProducto);
    actualizarInterfazCarrito();
}

// Actualizar total
function actualizarTotal() {
    const total = carrito.reduce((suma, elemento) => suma + (elemento.precio * elemento.cantidad), 0);
    montoTotal.textContent = total.toLocaleString('es-CO');
}

// Sistema de filtros y búsqueda
function buscarProductos() {
    aplicarFiltros();
}

function aplicarFiltros() {
    const terminoBusqueda = entradaBusqueda.value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('category-filter')?.value || 'todos';
    const marcaSeleccionada = document.getElementById('brand-filter')?.value || 'Todos';
    const ordenarPor = document.getElementById('sort-filter')?.value || 'nombre';
    
    productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda) || 
                               producto.marca.toLowerCase().includes(terminoBusqueda);
        const coincideCategoria = categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada;
        const coincideMarca = marcaSeleccionada === 'Todos' || producto.marca === marcaSeleccionada;
        
        return coincideBusqueda && coincideCategoria && coincideMarca;
    });
    
    // Ordenar productos
    productosFiltrados.sort((a, b) => {
        switch(ordenarPor) {
            case 'precio-bajo': return a.precio - b.precio;
            case 'precio-alto': return b.precio - a.precio;
            case 'valoracion': return b.valoracion - a.valoracion;
            case 'nombre': return a.nombre.localeCompare(b.nombre);
            default: return 0;
        }
    });
    
    mostrarProductos(productosFiltrados);
}

// Sistema de pago con tarjetas
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    mostrarModalPago();
}

function mostrarModalPago() {
    const total = carrito.reduce((suma, elemento) => suma + (elemento.precio * elemento.cantidad), 0);
    
    const modalPago = document.createElement('div');
    modalPago.className = 'modal';
    modalPago.id = 'payment-modal';
    modalPago.innerHTML = `
        <div class="modal-content payment-modal">
            <span class="close" onclick="cerrarModalPago()">&times;</span>
            <h2>Finalizar Compra</h2>
            <div class="payment-summary">
                <h3>Resumen del Pedido</h3>
                <p>Total a pagar: <strong>$${total.toLocaleString('es-CO')}</strong></p>
            </div>
            
            <form id="formulario-pago">
                <h3>Información de Envío</h3>
                <div class="form-group">
                    <input type="text" id="nombreCompleto" placeholder="Nombre completo" required>
                    <input type="email" id="correo" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="text" id="direccion" placeholder="Dirección" required>
                    <input type="text" id="ciudad" placeholder="Ciudad" required>
                </div>
                
                <h3>Método de Pago</h3>
                <div class="payment-method-selector">
                    <label><input type="radio" name="metodoPago" value="tarjeta" checked onchange="mostrarCamposPago()"> Tarjeta de Crédito/Débito</label>
                    <label><input type="radio" name="metodoPago" value="efectivo" onchange="mostrarCamposPago()"> Pago en Efectivo (Contra Entrega)</label>
                </div>
                
                <div id="campos-tarjeta">
                    <h4>Información de Tarjeta</h4>
                    <div class="card-type-selector">
                        <label><input type="radio" name="tipoTarjeta" value="visa" checked> Visa</label>
                        <label><input type="radio" name="tipoTarjeta" value="mastercard"> Mastercard</label>
                        <label><input type="radio" name="tipoTarjeta" value="amex"> American Express</label>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" id="numeroTarjeta" placeholder="Número de tarjeta" maxlength="19">
                        <input type="text" id="nombreTarjeta" placeholder="Nombre en la tarjeta">
                    </div>
                    <div class="form-group">
                        <input type="text" id="fechaVencimiento" placeholder="MM/AA" maxlength="5">
                        <input type="text" id="cvv" placeholder="CVV" maxlength="4">
                    </div>
                </div>
                
                <div id="campos-efectivo" style="display: none;">
                    <div class="efectivo-info">
                        <h4>Pago en Efectivo</h4>
                        <p>📦 El pago se realizará al momento de la entrega</p>
                        <p>💰 Tenga el monto exacto: <strong>$${total.toLocaleString('es-CO')}</strong></p>
                        <p>🚚 Tiempo de entrega: 2-3 días hábiles</p>
                    </div>
                </div>
                
                <button type="submit" class="pay-btn">Confirmar Pedido - $${total.toLocaleString('es-CO')}</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modalPago);
    modalPago.style.display = 'block';
    
    // Formatear número de tarjeta
    document.getElementById('numeroTarjeta')?.addEventListener('input', formatearNumeroTarjeta);
    document.getElementById('fechaVencimiento')?.addEventListener('input', formatearFechaVencimiento);
    document.getElementById('cvv')?.addEventListener('input', formatearCVV);
    
    document.getElementById('formulario-pago').addEventListener('submit', procesarPago);
}

function formatearNumeroTarjeta(e) {
    let valor = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let valorFormateado = valor.match(/.{1,4}/g)?.join(' ') || valor;
    e.target.value = valorFormateado;
}

function formatearFechaVencimiento(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    e.target.value = valor;
}

function formatearCVV(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

function mostrarCamposPago() {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    const camposTarjeta = document.getElementById('campos-tarjeta');
    const camposEfectivo = document.getElementById('campos-efectivo');
    const botonPago = document.querySelector('.pay-btn');
    
    if (metodoPago === 'tarjeta') {
        camposTarjeta.style.display = 'block';
        camposEfectivo.style.display = 'none';
        botonPago.textContent = `Pagar $${carrito.reduce((suma, elemento) => suma + (elemento.precio * elemento.cantidad), 0).toLocaleString('es-CO')}`;
        
        // Hacer campos requeridos
        document.getElementById('numeroTarjeta').required = true;
        document.getElementById('nombreTarjeta').required = true;
        document.getElementById('fechaVencimiento').required = true;
        document.getElementById('cvv').required = true;
    } else {
        camposTarjeta.style.display = 'none';
        camposEfectivo.style.display = 'block';
        botonPago.textContent = `Confirmar Pedido - $${carrito.reduce((suma, elemento) => suma + (elemento.precio * elemento.cantidad), 0).toLocaleString('es-CO')}`;
        
        // Quitar requerimientos
        document.getElementById('numeroTarjeta').required = false;
        document.getElementById('nombreTarjeta').required = false;
        document.getElementById('fechaVencimiento').required = false;
        document.getElementById('cvv').required = false;
    }
}

function procesarPago(e) {
    e.preventDefault();
    
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    const total = carrito.reduce((suma, elemento) => suma + (elemento.precio * elemento.cantidad), 0);
    
    if (metodoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numeroTarjeta').value;
        const cvv = document.getElementById('cvv').value;
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        
        // Validaciones para tarjeta
        if (!validarNumeroTarjeta(numeroTarjeta)) {
            alert('Número de tarjeta inválido');
            return;
        }
        
        if (!validarFechaVencimiento(fechaVencimiento)) {
            alert('Fecha de vencimiento inválida');
            return;
        }
        
        if (cvv.length < 3) {
            alert('CVV inválido');
            return;
        }
    }
    
    // Simular procesamiento
    const botonPago = document.querySelector('.pay-btn');
    botonPago.textContent = 'Procesando...';
    botonPago.disabled = true;
    
    setTimeout(() => {
        const numeroPedido = generarNumeroPedido();
        
        let mensaje = `¡Pedido confirmado!\n\nNúmero de orden: ${numeroPedido}\nTotal: $${total.toLocaleString('es-CO')}\n`;
        
        if (metodoPago === 'tarjeta') {
            mensaje += '\n💳 Pago procesado con tarjeta\nRecibirás un email de confirmación.';
        } else {
            mensaje += '\n💰 Pago en efectivo al recibir\n🚚 Entrega en 2-3 días hábiles\nTenga el monto exacto preparado.';
        }
        
        mensaje += '\n\n¡Gracias por tu compra en SportShop!';
        
        alert(mensaje);
        
        // Limpiar carrito y cerrar modales
        carrito = [];
        actualizarInterfazCarrito();
        cerrarModalPago();
        modalCarrito.style.display = 'none';
    }, 2000);
}

function validarNumeroTarjeta(numeroTarjeta) {
    const limpio = numeroTarjeta.replace(/\s/g, '');
    return limpio.length >= 13 && limpio.length <= 19 && /^\d+$/.test(limpio);
}

function validarFechaVencimiento(fechaVencimiento) {
    const [mes, año] = fechaVencimiento.split('/');
    if (!mes || !año) return false;
    
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;
    
    const mesVencimiento = parseInt(mes);
    const añoVencimiento = parseInt(año);
    
    if (mesVencimiento < 1 || mesVencimiento > 12) return false;
    if (añoVencimiento < añoActual || (añoVencimiento === añoActual && mesVencimiento < mesActual)) return false;
    
    return true;
}

function generarNumeroPedido() {
    return 'SP' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
}

function cerrarModalPago() {
    const modalPago = document.getElementById('payment-modal');
    if (modalPago) {
        modalPago.remove();
    }
}

// Event listeners
botonCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'block';
});

cerrarModal.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = 'none';
    }
});

botonBusqueda.addEventListener('click', buscarProductos);

entradaBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarProductos();
    }
});

botonPagar.addEventListener('click', finalizarCompra);

// Crear filtros
function crearFiltros() {
    const contenedorFiltros = document.createElement('div');
    contenedorFiltros.className = 'filters-container';
    contenedorFiltros.innerHTML = `
        <div class="filters">
            <select id="category-filter">
                ${categorias.map(cat => `<option value="${cat.id}">${cat.nombre}</option>`).join('')}
            </select>
            <select id="brand-filter">
                ${marcas.map(marca => `<option value="${marca}">${marca}</option>`).join('')}
            </select>
            <select id="sort-filter">
                <option value="nombre">Ordenar por nombre</option>
                <option value="precio-bajo">Precio: menor a mayor</option>
                <option value="precio-alto">Precio: mayor a menor</option>
                <option value="valoracion">Mejor valorados</option>
            </select>
        </div>
    `;
    
    const principal = document.querySelector('.main .container');
    principal.insertBefore(contenedorFiltros, document.getElementById('products-grid'));
    
    // Event listeners para filtros
    document.getElementById('category-filter').addEventListener('change', aplicarFiltros);
    document.getElementById('brand-filter').addEventListener('change', aplicarFiltros);
    document.getElementById('sort-filter').addEventListener('change', aplicarFiltros);
}

// Inicializar
crearFiltros();
mostrarProductos();
actualizarInterfazCarrito();