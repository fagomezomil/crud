const formularioNota = document.getElementById('form-nota');
const tituloInput = document.getElementById('titulo-input');
const notaInput = document.getElementById('nota-input');
const cardsEspacio = document.getElementById('espacio-cards');
const editarForm = document.getElementById('formularioEditar');
const editarNombreInput = document.getElementById('editarNombre');
const editarContenido = document.getElementById('editarContenido');
const json = localStorage.getItem('notas'); // Traer de localStorage el dato asociado a la key "usuarios".
let notas = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.
let notaId = '';

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
        <div class="tarjeta">
                <div class="bg-titulo">
                    <div class="tarjeta-titulo d-flex justify-content-between">
                        <div class="">
                            ${nota.titulo}
                        </div>
                    </div>
                    <div class="bg-cuerpo">
                        <div class="botonera">
                        <button type="button" class="btn claro" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="cargarModalEditar('${nota.id}')"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn claro ps-3" style="text-align: right;"
                            aria-label="Close" onclick="eliminarNota('${nota.id}')"><i class="far fa-trash-alt"></i></button>
                        </div>
                        <div class="cuerpo-texto">${nota.cuerpo}</div>

                    </div>
                </div>
            </div>
        `;
        cards.push(card);
    }
    cardsEspacio.innerHTML = cards.join('');
}

mostrarNotas();

function eliminarNota(id) {
    // const notasFiltrados = notas.filter((nota) => nota.id !== id);

    let notasFiltrados = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const coincideId = nota.id === id;
        if (!coincideId) {
            notasFiltrados.push(nota);
        }
    }
    const json = JSON.stringify(notasFiltrados);
    localStorage.setItem('notas', json);
    notas = notasFiltrados;
    console.log("Se eliminó exitosamente la nota. 👨‍💻");
    mostrarNotas();
}

// function mostrarDetalle(id) {
//     const tarjetaEncontrada = notas.find((nota) => nota.id === id);
//     const detalleDiv = document.getElementById('detallesNota');
//     const fecha = new Date(tarjetaEncontrada.registro);
//     console.log('mostrarDetalle - fecha', fecha);
//     const detallesNota = `
//                     <div class="bg-titulo">
//                         <div class="tarjeta-titulo d-flex justify-content-between">
//                             <div class="">
//                                 ${nota.titulo}
//                             </div>
//                             <div class="">
//                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//                             </div>
                            
//                         </div>
//                         <div class="bg-cuerpo">
//                             <div class="botonera">
//                             <button type="button" class="btn claro" data-bs-toggle="modal" data-bs-target="#modalDetalle"><i class="fas fa-edit"></i></button>
//                             <button type="button" class="btn claro ps-3" style="text-align: right;"
//                                 aria-label="Close" onclick="eliminarNota('${nota.id}')"><i class="far fa-trash-alt"></i></button>
//                             </div>
//                             <div class="cuerpo-texto">${nota.cuerpo}</div>
    
//                         </div>
//                     </div>
//     `;
//     detalleDiv.innerHTML = detallesNota;
// }


// Esta función carga los datos del usuario seleccionado,
// en los campos del formulario del documento HTML.
function cargarModalEditar(id) {
    // Buscar el usuario en el array usando el método find().
    const notaEncontrado = notas.find((nota) => nota.id === id);
    editarNombreInput.value = notaEncontrado.titulo;
    editarContenido.value = notaEncontrado.cuerpo;

    // Actualizar el valor de la variable global usuarioId, con el id del usuario encontrado.
    notaId = notaEncontrado.id;
    console.log(notaEncontrado)
}

// Al evento submit del formulario de edición le asignamos esta función,
// que actualiza al usuario seleccionado, con los datos ingresados.
editarForm.onsubmit = function editarNota(e) {
    e.preventDefault();
    // Actualizar un usuario del array, usando map().
    const notasModificado = notas.map((nota) => {
        // Usamos el id de usuario guardado en usuarioId,
        // para modificar solo al usuario que coincida con este.
        console.log(notaId,nota.id)
        if (nota.id === notaId) {
            // Usar spread syntax para copiar las propiedades de un objeto a otro.
            const notaModificado = {
                ...nota,
                titulo: editarNombreInput.value,
                cuerpo: editarContenido.value,

            };
            return notaModificado;
        } else {
            // Retornar el usuario sin modificar en los casos que no coincida el id.
            return nota;
        }

    });

    // Esto puede ser expresado también con el operador ternario:
    // const usuariosModificado = usuarios.map((usuario) => (usuario.id === usuarioId) ? {
    //         ...usuario,
    //         nombre: editarNombreInput.value,
    //         rol: editarRolInput.value,
    //     }
    //     : usuario
    // );

    const json = JSON.stringify(notasModificado);
    // Guardar lista de usuarios en localStorage.
    localStorage.setItem('notas', json);
    notas = notasModificado;
    console.log("Se modificó exitosamente un usuario. 👨‍💻");
    mostrarNotas();
    // Ocultar el modal con las funciones incluidas en bootstrap.
    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};