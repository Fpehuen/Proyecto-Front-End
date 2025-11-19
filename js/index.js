
import { productos } from "./productos.js"
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedortarjetas = document.getElementById("contenedor-tarjetas");

    const carrito = obtenerCarrito()
    actualizarContador(carrito)

    console.log(productos);
    //Empiezo a crear tarjetas para cada producto
    productos.forEach(producto => {


        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        // //Normalizo la categoria para poder comparar sin acentos
        const categoriaNormalizada = producto.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (categoriaNormalizada === "Mitico") {
            tarjeta.classList.add("producto__mitico");
        }


        //Agrego la imagen
        const img = document.createElement("img")
        img.src = `./${producto.imagen}`
        img.alt = producto.nombre

        //Agrego el nombre del producto
        const titulo = document.createElement("h3");
        titulo.classList.add("nombreProducto");
        titulo.textContent = producto.nombre;

        //Agrego el precio con formato específico
        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        //Agrego la categoria
        const categoria = document.createElement("p");
        categoria.classList.add("categoria");
        categoria.textContent = `Producto ${producto.categoria}`;

        const boton = document.createElement("button")
        boton.classList.add("bot")
        boton.textContent = "Agregar al carrito"

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto)


        })

        //Teniendo todos los elemnetos se agregan a la tarjeta de producto
        tarjeta.appendChild(img)
        tarjeta.appendChild(titulo)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(categoria)
        tarjeta.appendChild(boton)

        //Agrego la tarjeta al contenedor
        contenedortarjetas.appendChild(tarjeta)




    });

})



