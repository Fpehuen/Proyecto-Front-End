

export const agregarProducto = (producto, carrito) => {
    carrito.push(producto);
    alert("Producto agregado");
}

export const eliminarProducto = (nombreProducto, array) => {
    let indiceProducto = array.findIndex(
        (prod) => prod.nombre.toLowerCase() === nombreProducto.toLowerCase()
    );

    if (indiceProducto !== -1) {
        array.splice(indiceProducto, 1);
        alert("Eliminado");
    } else {
        alert("Producto no encontrado");
    };
};