async function mostrarDetallesPersonaje() {
  try {

    // Obtén el ID del personaje de la URL

    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get("id");

   
    const response = await fetch(`${URLbase}/${characterId}`);
    if (!response.ok) {
      
      throw new Error("Error al obtener datos de la API");
    }
    const characterData = await response.json();

   

    const personajeDetalles = document.getElementById("personaje-detalles");
    personajeDetalles.innerHTML = `
    <div class="contaniner-info">
    <div class="imagen-pj">
    <img src="${characterData.image}" alt="${characterData.name}">
    </div>
    
    <div class="datos-pj">
    <h1>${characterData.name}</h1>
    <p><span>speciestatus</span>: ${characterData.status} - ${characterData.species}</p>
    <p><span>Gener</span>: ${characterData.gender}</p>
    <p><span>Origin</span>: ${characterData.origin.name}</p>
    <p><span>Ubicacion Actual</span>: ${characterData.location.name}</p>
    <p><span>Numero de Episodios</span>: ${characterData.episode.length}</p>  
    </div>

    </div>
   
    `;
  } catch (error) {
    console.error("Error al obtener datos de la API", error);
  }
}

window.onload = async () => {
  await mostrarDetallesPersonaje();
};