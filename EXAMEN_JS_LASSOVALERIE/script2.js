function mostrarCarrito() {
    // Obtener el carrito desde el localStorage
    let carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Carrito del inicio:", carritoProductos); // Log para verificar la lista inicial

    // Sumar la cantidad de los productos agregados varias veces
    const productosCantidad = {}; //almacena
    carritoProductos.forEach(producto => {
        if (productosCantidad[producto.id]) {
            productosCantidad[producto.id].cantidadd++;
        } else {
            productosCantidad[producto.id] = { ...producto, cantidadd: 1 };
        }
    });

    const contenedor = document.getElementById("cont2");
    contenedor.innerHTML = '';

    // mostrar los productos con la cantidad
    Object.values(productosCantidad).forEach(producto => {
        
        contenedor.innerHTML += `
        <div id="mostrarRobux" data-id="${producto.id}">
            <img src="img/logo.png" alt="logo" class="logo">
            <div class="informacionVenta">${producto.app} - ${producto.cantidad} Robux - ${producto.tipo}</div>
            <div class="precio">${producto.moneda} ${producto.precio}</div>
            <div class="cantidad">
                <button class="bMas" data-id="${producto.id}">+</button>
                <h3 class="cantidadProducto" data-id="${producto.id}">${producto.cantidadd}</h3>
                <button class="bMenos" data-id="${producto.id}">-</button>
            </div>
        </div>`;
    });

    actualizarTotal(productosCantidad)
    // Agregar la cantidad del producto
    const botonMas = document.querySelectorAll('.bMas');
    botonMas.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const idProducto = evento.target.getAttribute('data-id'); // obtener id del producto seleccionado
            console.log(idProducto);
            // aumentar la cantidad del producto en el carrito
            carritoProductos.push(carritoProductos.find(producto => producto.id === idProducto));

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carritoProductos));

            console.log("+:", carritoProductos); // Verificar lista actualizada

            // mostrar el carrito actualizado
            mostrarCarrito();
        });
    });

    // restar la cantidad del producto en el carrito
    const botonMenos = document.querySelectorAll('.bMenos');
    botonMenos.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const idProducto = evento.target.getAttribute('data-id'); // obtener id

            // Disminuir la cantidad del producto (solo si hay más de uno)
            const index = carritoProductos.findIndex(producto => producto.id === idProducto);
            if (index !== -1) {
                carritoProductos.splice(index, 1);
            }

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carritoProductos));

            console.log("-", carritoProductos); // Verificar lista actualizada

            // Volver a mostrar el carrito
            mostrarCarrito();
        });
    });
}

mostrarCarrito()

// calcular el total de los productos agregados
function actualizarTotal(productosCantidad) {
    const total = Object.values(productosCantidad).reduce((a, producto) => {
        return a + producto.cantidadd * producto.precio;
    }, 0);

    const footer = document.getElementById("total");
    footer.innerHTML = `
        <h1>Total</h1>
        <h1>${total.toFixed(2)}</h1> 
        <button class="pagar">Pagar</button>`;
}
