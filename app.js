
let paginaActual = 1;
let cantidadPaginas = 0;
let terminoBusqueda = '';

async function renderizarPersonajes(numberPage, searchTerm = "") {
  try {
    const response = await fetch(`${URLbase}/?page=${numberPage}&name=${searchTerm}`);
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();
    const informacion = data.results;
    const mostrarInfo = document.getElementById("Apis");
    let contenidoHTML = "";

    cantidadPaginas = data.info.pages;

    informacion.forEach((info) => {
      contenidoHTML += `
      <article class="API">

      <a class="container-pejo" href="personajes.html?id=${info.id}">

              <div class="image-container">
                  <img src="${info.image}" alt="">
              </div>

              <div class="name-pejo">
              <h2>${info.name}</h2>
              <p>Click para ver!</p>
              </div>

              </a>

          </article>
            `;
    });

    mostrarInfo.innerHTML = contenidoHTML;
  } catch (error) {
    console.error("Error al obtener datos de la API", error);
  }
}

async function renderizarBotones() {
  const numberPages = document.querySelector("#number-pages");
  let numbersHTML = "";

  for (let count = 1; count <= cantidadPaginas; count++) {
    numbersHTML += `
            <button onclick="cambiarPagina(${count})" class="number-button">${count}</button>
        `;
  }
  

  numberPages.innerHTML = numbersHTML;
}

function cambiarPagina(count) {
  renderizarPersonajes(count);
  const buttons = document.querySelectorAll(".number-button");

  buttons.forEach((button) => button.classList.remove("number-active"));

  const numberActive = document.querySelector(
    `.number-button:nth-child(${count})`
  );
  numberActive.classList.add("number-active");
}


window.onload = async () => {
  await renderizarPersonajes(paginaActual);
  await renderizarBotones();
  
    // Agrega un evento de escucha al input para realizar búsquedas en tiempo real

    const filtroInput = document.getElementById("filtro-personajes");
    filtroInput.addEventListener("input", () => {
      const searchTerm = filtroInput.value.trim();
      terminoBusqueda = searchTerm;  // Actualiza el término de búsqueda
      renderizarPersonajes(paginaActual, searchTerm);
    });
};
