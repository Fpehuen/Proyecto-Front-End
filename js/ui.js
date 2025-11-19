// export const actualizarContador = (carrito) => {
//     const contador = document.getElementById("contador-carrito")
//     if (contador) {
//         contador.textContent = carrito.length;
//     }
// }

// export const mostrarMensaje = (texto) => {
//     alert(texto)
// }

export const actualizarContador = (carrito) => {
    const contador = document.getElementById("contador-carrito"); 
    
    if (!contador) return; 

    const items = carrito.length;

    if (items < 10) {
        contador.textContent = items;
    } else {
        contador.textContent = "9+";
    }
}

export const mostrarMensaje = (texto) => {
    alert(texto);
}
