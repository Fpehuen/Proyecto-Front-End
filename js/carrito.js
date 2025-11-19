import { obtenerCarrito } from "./storage.js";
import { vaciarCarro } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";
import { guardarCarrito } from "./storage.js";

// Función para eliminar todos los productos de un mismo ID
const eliminarProducto = (id) => {
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
};

const renderizarCarrito = () => {

  // Obtenemos carrito y actualizamos contador
  let carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  // Limpiamos contenedores antes de renderizar
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  // Si no hay productos en el carrito mostramos mensaje
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Actualmente no hay productos en el carro";
    contenedor.appendChild(mensaje);
    return; 
  }

  // Agrupamos productos por ID para evitar duplicados
  const agrupado = {};
  carrito.forEach(prod => {
    if (!agrupado[prod.id]) {
      agrupado[prod.id] = { ...prod, cantidad: 1 };
    } else {
      agrupado[prod.id].cantidad++;
    }
  });

  const productosUnicos = Object.values(agrupado);
  let total = 0;

  // Render de cada producto

  productosUnicos.forEach(producto => {

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    // Normalizo la categoria para poder comparar sin acentos
    const categoriaNormalizada = producto.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (categoriaNormalizada === "Mitico") {
      tarjeta.classList.add("producto__mitico");
    }

    // Agrego la imagen
    const img = document.createElement("img");
    img.src = `../${producto.imagen}`;
    img.alt = producto.nombre;

    // Agrego el nombre del producto
    const titulo = document.createElement("h3");
    titulo.classList.add("nombreProducto");
    titulo.textContent = producto.nombre;

    // Agrego el precio
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;

    // Agrego la categoria
    const categoria = document.createElement("p");
    categoria.classList.add("categoria");
    categoria.textContent = `Producto ${producto.categoria}`;

    // Agrego la cantidad
    const cantidad = document.createElement("p");
    cantidad.classList.add("cantidad");
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;

    // Botón restar
    const btnRestar = document.createElement("button");
    btnRestar.classList.add("bot");
    btnRestar.textContent = "-";
    btnRestar.addEventListener("click", () => {
      const index = carrito.findIndex(p => p.id === producto.id);
      if (index !== -1) carrito.splice(index, 1);
      guardarCarrito(carrito);
      renderizarCarrito();
    });

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("bot");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(producto.id);
      renderizarCarrito();
    });

    // Botón sumar
    const btnSumar = document.createElement("button");
    btnSumar.classList.add("bot");
    btnSumar.textContent = "+";
    btnSumar.addEventListener("click", () => {
      carrito.push(producto);
      guardarCarrito(carrito);
      renderizarCarrito();
    });

    // Agrego los elementos a tarjeta
    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(cantidad);
    tarjeta.appendChild(btnRestar);
    tarjeta.appendChild(btnEliminar);
    tarjeta.appendChild(btnSumar);

    contenedor.appendChild(tarjeta);

    // Calculamos total para checkout
    total += producto.precio * producto.cantidad;
  });

  // Mostrar total
  const totalTexto = document.createElement("p");
  totalTexto.classList.add("descripcion")
  totalTexto.textContent = `Total: $${total}`;
  divAcciones.appendChild(totalTexto);

  // Botón vaciar carro
  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("boton-vaciar");
  btnVaciar.textContent = "Vaciar carro";
  btnVaciar.addEventListener("click", () => {
    vaciarCarro();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

// Renderizamos cuando carga la página
document.addEventListener("DOMContentLoaded", renderizarCarrito);
