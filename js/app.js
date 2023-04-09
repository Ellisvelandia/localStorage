const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoHTML();
  });

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos

    limpiarHTML(); //eliminamos todo el html
  });
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
  }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisar si un elemento ya existe ne el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retonar el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

//muestra el carrito de compras en el html

function carritoHTML() {
  //limpiar el html

  limpiarHTML();

  //recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id, nombre } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src="${imagen}" alt="${nombre}" width="100" />
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
    `;

    //agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  sincronizaeStorage();
}

function sincronizaeStorage() {
  localStorage.setItem("carrito", JSON.stringify());
}

//elimina los curso del tbody

function limpiarHTML() {
  //formalenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
