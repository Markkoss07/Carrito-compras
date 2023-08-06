const btnColorMode = document.querySelector("#colorModo");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
}

function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
}

btnColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})


const form = document.getElementById('registro');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('nombre', e.target[0].value);
  localStorage.setItem('apellido', e.target[1].value);
  localStorage.setItem('mail', e.target[2].value);

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  

  const el = document.getElementById('respuesta');
  let parrafo = document.createElement('h3');
  parrafo.innerText = `¡Bienvenido ${nombre} ${apellido} a nuestra tienda!`;
  el.append(parrafo);

});

// CARRITO

const btnCart = document.querySelector('.iconoCarrito');
const containerCartProducts = document.querySelector(
	'.conteinercarroProducto'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('carritoOculto');
});

/* ========================= */
const cartInfo = document.querySelector('.carritoProducto');
const rowProduct = document.querySelector('.filadeProducto');

// Lista de los contenedores de productos
const productsList = document.querySelector('.lista1Productos');


let allProducts = [];

const valorTotal = document.querySelector('.totalPagar');

const countProducts = document.querySelector('#contadordeProductos');

const cartEmpty = document.querySelector('.carritoVacio');
const cartTotal = document.querySelector('.carritoTotal');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('botonComprar')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('.tituloProducto').textContent,
			price: product.querySelector('.precio').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('cerrarIcono')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('oculto');
		rowProduct.classList.add('oculto');
		cartTotal.classList.add('oculto');
	} else {
		cartEmpty.classList.add('oculto');
		rowProduct.classList.remove('oculto');
		cartTotal.classList.remove('oculto');
	}

	// limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('carritoProducto');

		containerProduct.innerHTML = `
            <div class="info-carrito-producto">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="cerrarIcono"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}.000`;
	countProducts.innerText = totalOfProducts;
};
