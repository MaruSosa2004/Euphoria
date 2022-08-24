class Tarea {
    constructor(nombre, pago, seleccion) {
        this.nombre = nombre
        this.pago = pago
        this.seleccion = seleccion
    }
}

let Productos = []

if(localStorage.getItem('tareas')) {
    Productos =  JSON.parse(localStorage.getItem('tareas'))
} else {
    localStorage.setItem('tareas', JSON.stringify(Productos))
}

const form = document.getElementById("idForm")
const botonTareas = document.getElementById("botonTareas")
const divTareas = document.getElementById("divTareas")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)

    const tarea = new Tarea(datForm.get("nombre"), datForm.get("pago"), datForm.get("seleccion"))
    
    Productos.push(tarea)

    localStorage.setItem('tareas', JSON.stringify(Productos))

    form.reset()
})

botonTareas.addEventListener('click', () => {
    const tarStorage = JSON.parse(localStorage.getItem('tareas'))

    divTareas.innerHTML = ""

    tarStorage.forEach((tarea, indice) => {
        divTareas.innerHTML += `
            <div class="card bg-light mb-3" id="tarea${indice}" style="max-width: 18rem;margin:3px;">
                <div class="card-header"><h2>${tarea.nombre}<h2></div>
                <div class="card-body">
                    <p class="card-title">${tarea.pago}</p>
                    <p class="card-text">${tarea.seleccion}</p>
                    <button class="btn btn-danger">Eliminar</button>
                </div>
            </div>`
})
tarStorage.forEach((tarea, indice) => {
        const tarjetaTarea = document.getElementById(`tarea${indice}`)

        tarjetaTarea.children[1].children[2].addEventListener('click', () => {
            tarjetaTarea.remove()
            Productos.splice(indice, 1)
            localStorage.setItem('tareas', JSON.stringify(Productos))
            console.log(`${tarea.nombre} Eliminada`)
        })
    })
})

class Album {
    constructor(id, nombre, grupo,) {
        this.id = id
        this.nombre = nombre
        this.grupo =grupo
    }
}

const TWICE = new Album(1, "Between1&2", "TWICE")
const ITZY = new Album(2, "Checkmate", "ITZY",)
const BTS = new Album(3, "Proof", "BTS")
const IVE = new Album(4, "After Like", "IVE")
const BLACKPINK = new Album(5, "Pink Venom", "BLACKPINK")
const NCT = new Album(6, "Regular", "NCT")
const MAMAMMOO = new Album(7, "AYA", "MAMAMMOO")
const TWICE2 = new Album(8, "Formula Of Love", "TWICE")
const NCT2 = new Album(9, "Dream = Glitch Mode", "NCT")
const IVE2 = new Album(10, "Love Dive", "IVE")
const BTS2 = new Album(11, "Map Of Soul 7", "BTS")
const ST = new Album(12, "ODDINARY", "ST")

const Albums = [TWICE, ITZY, BTS, IVE, BLACKPINK, NCT, MAMAMMOO, TWICE2, NCT2, IVE2, BTS2, ST]