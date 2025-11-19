import { obtenerCarrito } from "./storage.js";
import { eliminarProducto } from "./funcionesCarrito.js";
import { vaciarCarro } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  
  const contenedor = document.getElementById("contenedor-carrito");
  // Botones de acciones
  const divAcciones = document.getElementById("acciones-carrito");

      //Esta lineas limpian los contenedor antes de renderizar tarjetas y botones
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

      //Si no hay productos en el carrito mostramos un mensaje y cortamos el proceso
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Actualmente no hay productos en el carro";
    contenedor.appendChild(mensaje);
    return; 
  }


  carrito.forEach((producto, indice) => {

    const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        // //Normalizo la categoria para poder comparar sin acentos
        const categoriaNormalizada = producto.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (categoriaNormalizada === "Mitico") {
            tarjeta.classList.add("producto__mitico");
        }


        //Agrego la imagen
        const img = document.createElement("img")
        img.src = `../${producto.imagen}`
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
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("bot");
    
        //Uso el indice para saber que eliminar
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);

        //Renderizar el carro actualizado
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("boton-vaciar");
  btnVaciar.textContent = "Vaciar carro";
  btnVaciar.addEventListener("click", () => {
    vaciarCarro();

          //Vuelve a renderizar el carro actualizado
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);