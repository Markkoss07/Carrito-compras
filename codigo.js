const botonColorMode = document.querySelector("#colorModo");
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

botonColorMode.addEventListener("click", () => {
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

