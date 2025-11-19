import { guardarCarrito } from "./storage.js";
import { obtenerCarrito } from "./storage.js";
import { vaciarCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {

    const carrito = obtenerCarrito();
    carrito.push(producto)
    console.log(producto)
    console.log(carrito)
    
    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje("Agragado correctamemte")

}

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1)
    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje("Eliminado correctamente")
}

export const vaciarCarro = () => {
    vaciarCarrito()
    actualizarContador([])
    mostrarMensaje("Carrito vacío")
}