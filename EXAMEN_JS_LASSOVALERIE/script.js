// productos del carrito
let productosCarrito=[];

// obtener datos de la api
function getApi(){
    fetch("https://66df33c1de4426916ee3e098.mockapi.io/robux")
    .then(res => res.json())
    .then (apiRobux=>{
        console.log(apiRobux); // Su funcion es para ver si se está consumiendo la api correctamente mostrandola en consola.
        apiRobux.forEach(i => {
            // Se recorre la api para mostrar los resultados de manera ordenada.
            // se mostraran en el DIV "cont" del "index.html".
            document.getElementById("cont").innerHTML += `
            <div id="mostrarRobux">
                    <img src="img/logo.png" alt="logo" class="logo">
                    <div class="informacionVenta">${i.app} - ${i.cantidad} Robux <br> ${i.tipo}</div>
                    <div class="precio">${i.moneda} ${i.precio} 
                    <img src="img/carro-de-compras-forma-negra.png" alt="" class="carrito" data-id=${i.id}>
                    </div>
                </div>`
        });
        // funcion que tiene de parametro la api para poder ser usada.
        carrito(apiRobux)
    });
}
// llamar la funcion que consume la api apenas se ejecute el programa.
getApi()

function carrito(apiRobux){
    // obtener id del producto agregado al carrito
    document.addEventListener("click" ,(evento) =>{
        const id= evento.target.getAttribute("data-id")
        console.log("click", id);

            const productoAgregado= apiRobux.find(i => i.id === id);
            if(productoAgregado){
                productosCarrito.push(productoAgregado);
                console.log("carrito", productosCarrito);
                localStorage.setItem("carrito", JSON.stringify(productosCarrito));
                document.getElementById("cont2").innerHTML += `
                <div id="mostrarRobux">
                        <img src="img/logo.png" alt="logo" class="logo">
                        <div class="informacionVenta">${productoAgregado.app} - ${productoAgregado.cantidad} Robux - ${productoAgregado.tipo}</div>
                        <div class="precio">${productoAgregado.moneda} ${productoAgregado.precio} 
                        <img src="img/carro-de-compras-forma-negra.png" alt="" class="carrito" data-id=${i.id}>
                        </div>
                    </div>`
            }
                
            });

};
