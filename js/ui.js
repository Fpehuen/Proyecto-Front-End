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
    const contador = document.getElementById("contador-carrito"); // coincide con tu HTML
    
    if (!contador) return; // por si acaso

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
