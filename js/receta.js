function getID() {
    const id = new URLSearchParams(window.location.search).get('id');
    
    if (!id) {
        location.href = './';
    }

    return id;
}

var imgs;
var cont = 0;

// "CODIGO": 200,
// "RESULTADO": "OK",
// "FILAS": [
//   {
//     "id": 4,
//     "nombre": "Tortilla de patatas en freidora de aire",
//     "personas": 4,
//     "dificultad": 1,
//     "tiempo": 60,
//     "imagen": "18.webp",
//     "autor": "usuario5",
//     "elaboracion": "Empezamos ... servimos.",
//     "fechaCreacion": "2024-02-12"
//   }
// ]

function getReceta() {
    const id = getID();
    const url = `api/recetas/${id}`
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        const receta = response.FILAS[0];
        let diff = "";

        document.querySelector("#recipe-title").innerHTML = receta.nombre;

        document.querySelector("#user-link").innerHTML = receta.autor;
        document.querySelector("#user-link").href = `buscar.html?u=${receta.autor}`;
        
        document.querySelector("#date").date = receta.fechaCreacion;
        document.querySelector("#date").innerHTML = receta.fechaCreacion;

        document.querySelector("#quantity").innerHTML = receta.personas;
        document.querySelector("#time").innerHTML = receta.tiempo;

        for (let i = receta.dificultad; i > 0; i--) {
            diff += '<i class="icon-star"></i>';
        }
        
        for(let i = 3 - receta.dificultad; i > 0; i--) {
            diff += '<i class="icon-star-empty"></i>';
        }

        document.querySelector("#difficulty-container").innerHTML = diff;

        document.querySelector("#img").src = `fotos/${receta.imagen}`;

        document.querySelector("#elab").innerHTML = receta.elaboracion;

    }
    xhr.send()
}

// "CODIGO": 200,
// "RESULTADO": "OK",
// "FILAS": [
//   {
//     "id": 18,
//     "archivo": "18.webp",
//     "descripcion": "Podemos ver que queda cuajada y en su punto",
//     "idReceta": 4
//   }
// ]

function getImgs() {
    const id = getID();
    const url = `api/recetas/${id}/fotos`
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        imgs = response.FILAS;
        document.querySelector("#desc").innerHTML = imgs[0].descripcion;
        document.querySelector("#current").innerHTML = `${cont+1}/${imgs.length}`;
    }

    xhr.send()
}

// "CODIGO": 200,
// "RESULTADO": "OK",
// "FILAS": [
//   {
//     "id": 12,
//     "nombre": "Freidora de aire"
//   }
// ]

function getTags() {
    const id = getID();
    const url = `api/recetas/${id}/etiquetas`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        let tags = "";

        response.FILAS.forEach(tag => {
            tags += `
            <div class="tag">
                <i class="icon-tag"></i><span><a href="buscar.html?e=${tag.nombre}">${tag.nombre}</a></span></i>
            </div> 
            `
        });

        document.querySelector(".tags").innerHTML = tags;
    }

    xhr.send()
}


// "CODIGO": 200,
// "RESULTADO": "OK",
// "FILAS": [
//   {
//     "id": 29,
//     "texto": "5 patatas medianas"
//   }
// ]

function getIngredients() {
    const id = getID();
    const url = `api/recetas/${id}/ingredientes`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        let ingredients = "";

        response.FILAS.forEach(ingredient => {
            ingredients += `<li>${ingredient.texto}</li>`
        });

        document.querySelector("#ingredients").innerHTML = ingredients;
    }

    xhr.send()
}

// "CODIGO": 200,
// "RESULTADO": "OK",
// "FILAS": [
//   {
//     "login": "usuario1",
//     "titulo": "No me convence",
//     "texto": "Opino como el otro usuario, donde esté la tortilla de toda la vida que se quiten estos experimentos.",
//     "fechaHora": "2024-02-12 12:48:23"
//   }
// ]

function getComments() {
    const id = getID();
    const url = `api/recetas/${id}/comentarios`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        let comments = "";

        response.FILAS.forEach(comment => {
            comments += `
            <article class="comment">
                <h4>${comment.titulo}</h4>
                <p>${comment.texto}</p>
                <footer>
                    <span><i class="icon-calendar"></i>${comment.fechaHora.replace(" ", ", ").substring(0, comment.fechaHora.length - 2)}</span>
                    <span><i class="icon-pencil"></i>por <a href="buscar.html?u=${comment.login}">${comment.login}</a></span>
                </footer>
            </article>
        `
        });

        document.querySelector("#comments").innerHTML = comments;
    }

    xhr.send()
}

function changeImg( num ) {
    const contAux = cont + num;

    if ( contAux >= imgs.length || contAux < 0 ) { return; }

    cont = contAux;
    document.querySelector("#current").innerHTML = `${cont+1}/${imgs.length}`;
    document.querySelector("#img").src = `fotos/${imgs[cont].archivo}`;
    document.querySelector("#desc").innerHTML = imgs[cont].descripcion;
}

function canComment() {
    if ( isLogged() ) {
        document.querySelector("#write-comment").innerHTML = `
        <div class="my-comment">
            <form>
                <div class="comment input-group">
                    <label for="title"><i class="icon-basket"></i>Deja tu comentario</label>
                    <input maxlength="100" placeholder="Título del comentario..." name="title" id="title" type="text">
                    <textarea maxlength="300" placeholder="Escribe aquí tu comentario..." name="comment" id="comment"></textarea>
                </div>
                <footer class="buttons">
                    <button><i class="icon-cancel"></i>Limpiar</button>
                    <button><i class="icon-ok"></i>Buscar</button>
                </footer>
            </form>
        </div>
        `;
    } else {
        document.querySelector("#write-comment").innerHTML = `
        <div class="alert">
            Para poder hacer un comentario necesitas hacer <a href="login.html">login</a>
        </div>
        `
    }
}