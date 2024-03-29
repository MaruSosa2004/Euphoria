/*Js De un formulario de Pedidos
Se conecta con el Form.html y tiene como finalidad poder realizar un pedido y despues poder verificar los datos en una card.
En caso de que no sean correctos se puede borrar y volver a realizar con normalidad.
*/
class Producto {
    constructor(nombre,localidad,codigo,edad,DNi) {
        this.nombre = nombre
        this.localidad = localidad        
        this.codigo = parseFloat(codigo)
        this.edad = parseFloat(edad)
        this.DNi = parseFloat(DNi)
    }
}

let productos = []

if(localStorage.getItem('productos')) { 
    productos = JSON.parse(localStorage.getItem('productos'))
} else {
    localStorage.setItem('productos', JSON.stringify(productos))
}

const form = document.getElementById("form")
const mostrar = document.getElementById("mostrar")
const divProductos = document.getElementById("divProductos")

/*Utilización de sweetalert 2 para poder tener acciones mas dinamicas y es acorde a la estetica de mi pagina
por eso es fue mi eleccion al momento de buscar librerias*/
form.addEventListener('submit', (event) => {
    event.preventDefault() 
    const nombre = document.getElementById("nombre").value
    const localidad = document.getElementById("localidad").value
    const codigo = document.getElementById("codigo").value
    const edad = document.getElementById("edad").value
    const DNi = document.getElementById("DNi").value  
    const mensajeAlerta = document.getElementById("mensajeAlerta") 
        if(codigo < 0 || edad <0 || DNi < 0 ){
            Swal.fire('este valor no existe, porfavor comprobar sus datos')                                  
            return            
        } 
        
        else if (codigo >= 0|| edad >=0 || DNi >= 0 )
        {      
            const producto = new Producto (nombre, localidad, codigo, edad, DNi)
            productos.push(producto)    
            localStorage.setItem("productos", JSON.stringify(productos))
            form.reset()               
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Felicidades tu compra esta en revisación!',
                showConfirmButton: false,
                timer: 1600
              })    
            console.log(nombre, localidad, codigo, edad, DNi)  
        }                 
})
/*Card que va a mostrar todos los datos ingresados*/
mostrar.addEventListener('click', () => {
    const prodStorage = JSON.parse(localStorage.getItem('productos')) 
    divProductos.innerHTML = ""
    prodStorage.forEach((producto, indice) => {
        divProductos.innerHTML += `
            <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
                <div class="card-body">                
                    <h5 class="card-title">Nombre: ${producto.nombre}</h5>
                    <p class="card-text">Localidad: ${producto.localidad}</p>                 
                    <p class="card-text">Codigo: ${producto.codigo}</p>
                    <p class="card-text">Edad: ${producto.edad}</p>
                    <p class="card-text">numero de DNI:${producto.DNi}</p>   
                    <button class="btn btn-danger">Eliminar</button>                 
                </div>
            </div>`        
    })
    /*Aplicacion para poder cancelar el producto y en caso de no querer cancelarlo no se va a borrar.*/
    prodStorage.forEach((producto, indice) => {
        const tarjetaProducto = document.getElementById(`producto${indice}`)        
        tarjetaProducto.children[0].children[5].addEventListener('click', () => 
              {const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })              
            swalWithBootstrapButtons.fire({
              title: 'Introduciste tus datos mal?',
              text: "Elimina tus datos del servidor",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Borrar',
              cancelButtonText: 'Cancelar',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                  tarjetaProducto.remove()
                  productos.splice(indice, 1)
                  localStorage.setItem('productos', JSON.stringify(productos))  
                  console.log(`${producto.nombre} eliminado`)
                swalWithBootstrapButtons.fire(                
                  'Datos Eliminados',
                  'Tu compra fue cancelada'
                )
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Todo esta bien!',
                  'Tu inscripción esta intacta!',
                  'Cancelado'
                )
              }
            })
      })              
  })    
})
