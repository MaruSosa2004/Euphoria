/*Js De una barra de busqueda de productos
Se concecta con Photocards.html y te permite buscar las photocards disponibles en el sitio*/
const divProductos = document.getElementById("divProductos")
const botonProductos = document.getElementById("botonProductos")
const inputProducto = document.getElementById("inputProducto")

const traerProductos = async () => {
    const response = await fetch('../json/productos.json')
    const productos = await response.json()
    return productos
}
/*Se crea diferentes cards mostrando los productos que se consiguen por medio de una api creada justamente con ese fin.*/
function mostrarProductos(arrayProductos) {
    arrayProductos.forEach((producto, indice) => {
        divProductos.innerHTML += `
            <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
            <img src="../img/${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Modelo: ${producto.modelo}</p>
                    <p class="card-text">Año: ${producto.año}</p>
                    <p class="card-text">Stock Actual: ${producto.stock}</p>
                    <a href="https://listado.mercadolibre.com.ar/twice-photocards" class="btn btn-primary">Comprar</a>
                </div>
            </div>
            `
    });
}
/*Filtrado de busquedas
Por este medio cada vez que busques el nombre del producto se van a ir filtrando hasta tener menos opciones y encontrar
lo que se busca*/
inputProducto.addEventListener('input', () => {
    let res = inputProducto.value
   
    traerProductos().then(productos => {
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(res.toLowerCase()))
        divProductos.innerHTML = ""
        mostrarProductos(productosFiltrados)
    })
})

botonProductos.addEventListener('click', () => {
    traerProductos().then(productos => {
        mostrarProductos(productos)
    })
})