// Recuperar inventario desde localStorage

const inventario = JSON.parse(localStorage.getItem("inventario")) ?? [];

//Guitarras disponibles

const guitarrasDisponibles = inventario.filter(guitarra => guitarra.stock > 0);

// Recuperar carrito desde localStorage

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// Buscar guitarra por marca o modelo

const inputBusqueda = document.getElementById("busqueda");

inputBusqueda.addEventListener("input", () => {

    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const guitarrasFiltradas = guitarrasDisponibles.filter(guitarra =>
        guitarra.marca.toLowerCase().includes(textoBusqueda) ||
        guitarra.modelo.toLowerCase().includes(textoBusqueda)
    );

    imprimirGuitarrasEnHTML(guitarrasFiltradas);
});

// Mostrar guitarras en el HTML

function imprimirGuitarrasEnHTML(lista) {

    const contenedorGuitarras = document.getElementById("contenedor-guitarras");

    contenedorGuitarras.innerHTML = "";

    lista.forEach(guitarra => {

        const { marca, modelo, anio, precio, stock } = guitarra;

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <p>Marca: ${marca}</p>
            <h3>Modelo: ${modelo}</h3>
            <p>Año: ${anio}</p>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>

            <button class="card-boton">
                Agregar al carrito
            </button>
        `;

        contenedorGuitarras.appendChild(card);

        const btnAgregar = card.querySelector(".card-boton");

        btnAgregar.addEventListener("click", () => {

            carrito.push(guitarra);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            const mensaje = document.getElementById("mensaje");

            mensaje.textContent = "Se agregó " + marca + " " + modelo + " al carrito.";
        });
    });
}

// Mostrar guitarras disponibles al cargar la página

imprimirGuitarrasEnHTML(guitarrasDisponibles);
