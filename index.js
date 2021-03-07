const formularioNota = document.getElementById('form-nota');
const tituloInput = document.getElementById('titulo-input');
const notaInput = document.getElementById('nota-input');
const cardsEspacio = document.getElementById('espacio-cards');
const json = localStorage.getItem('notas'); // Traer de localStorage el dato asociado a la key "usuarios".
const notas = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNota.onsubmit = function (e) {
    e.preventDefault();
    const nota = {
        id: generarID(),
        titulo: tituloInput.value,
        cuerpo: notaInput.value,
    };
    notas.push(nota);
    const json = JSON.stringify(notas); // Convertir datos a un string JSON.
    localStorage.setItem('notas', json); // Guardar en localStorage un dato asociado a la key "usuarios".
    mostrarNotas();
    formularioNota.reset(); // reset limpia los campos del formulario.
};

function mostrarNotas() {
    // const usuariosMap = usuarios.map(function (usuario) {
    //     return `
    //         <tr>
    //             <td>${usuario.nombre}</td>
    //             <td>${usuario.email}</td>
    //             <td>${usuario.rol}</td>
    //         </tr>
    //     `;
    // }); // La función recorre y map genera un array nuevo sin modificar el array original.
    // // Recibe por parámetros la función que debe ejecutarse por cada elemento del array.
    // usuariosTable.innerHTML = usuariosMap.join('');
    let cards = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const card = `
        <div class="card tarjeta mb-4 me-4">
            <div class="card-body">
            <div class="bg-titulo-tarjeta">
            <h5 class="card-title">${nota.titulo}</h5>
            </div>
            <div class="bg-tarjeta">
            <p class="card-text">${nota.cuerpo}</p>
            </div>
        </div>
    </div>
        `;
        cards.push(card);
    }
    cardsEspacio.innerHTML = cards.join('');
}

mostrarNotas();