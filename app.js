//1
const contenedorPlantas = document.getElementById("contenedor-plantas");
//2
const contenedorCarrito = document.getElementById("carrito-contenedor");

//7 Actualizar el precio total y luego agrego el contador en el actualizador del carrito.

const precioTotal = document.getElementById("precioTotal")


//2
let carrito = [];

document.addEventListener(`DOMContentLoaded`, ( ) => {
    if (localStorage.getItem(`carrito`)){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        actualizCarrito()
    }
})

//1 
grupoPlantas.forEach((plantas) => {
    const div = document.createElement('div')
    div.classList.add('plantas')
    div.innerHTML = `
        <img src=${plantas.img} alt= "">
        <h3>${plantas.categoria} ${plantas.nombre}</h3>
        <p></p>
        <p>${plantas.descr}</p>
        <p class="precioProducto">Precio:$ ${plantas.precio}</p>
        <button id="agregar${plantas.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorPlantas.appendChild(div)

    //3
    const btnElim = document.getElementById(`agregar${plantas.id}`)
    btnElim.addEventListener("click", () => {
        agregarAlCarrito(plantas.id)
    })
})


//2
const agregarAlCarrito = (prodId) =>{
    //comprobamos si el tipo de planta ya existe 
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map ( prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })

    } else {
        //el id del array coincida con el id que llega por parametro
    const item = grupoPlantas.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)

    }
    
    actualizCarrito()
    
}


//3
const actualizCarrito = () =>{

    // actualizo el carrito
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito")
        div.innerHTML = `
        <p>${prod.categoria}</p>
        <p>Precic: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button id="eliminarDelCarrito${prod.id}" class ="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem(`carrito`, JSON.stringify(carrito))

        //4 boton vaciar carrito 
        const btnElimDelCarrito = document.getElementById(`eliminarDelCarrito${prod.id}`)
        btnElimDelCarrito.addEventListener("click", () => {
            eliminarDelCarrito(prod.id)

    
        })
    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio, 0 )
    })
}

//6
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    // encuentra el indice y borra uno
    carrito.splice(indice, 1)
    //pinto el carrito 
    actualizCarrito()
}

//Boton vaciar carrito

const botonVaciar = document.getElementById("vaciar-carrito");

botonVaciar.addEventListener("click", () =>{
    carrito.length = 0
    actualizCarrito()
})

//5 Contador del carrito- accedo y luego agrego el contador en el actualizador del carrito.
const contadorCarrito = document.getElementById("contadorCarrito");









