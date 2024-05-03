/*
dificultad: 2
id: 1
imagen: "1.png"
nombre: "Macarrones con tomate"
personas: 4
tiempo: 45
*/

function pedirRecetas(incremento) {

    const cant = incremento ? Number(document.querySelector("#mostrando").value) + 4 : 4;
    const url = `api/recetas?reg=${0}&cant=${cant}`
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {

        const response = xhr.response;

        if ( response.RESULTADO != 'OK' ) {
            return;
        }

        let html = '';

        response.FILAS.forEach( function(receta, idx) {
            html += `
            <article class="recipe">
                <div class="desc">
                    <a href="receta.html?id=${receta.id}">
                        <div class="img-container">
                            <img src="fotos/${receta.imagen}" alt="">
                        </div>
                        <h3 title="${receta.nombre}"><strong>${receta.nombre}</strong></h3>
                    </a>
                    <div class="stats">
                        <p><i class="icon-group"></i>${receta.personas} personas</p>
                        <p>
            `

            html += buildDifficultyHtml(receta.dificultad);

            html += `
                        Dificultad
                        </p>
                        <p><i class="icon-clock"></i>${receta.tiempo} min</p>
                    </div>
                </div>
            </article>`;
        });

        document.querySelector(".latest").innerHTML = html;
        document.querySelector("#mostrando").value = response.FILAS.length;
        document.querySelector("#total").value = response.TOTAL_COINCIDENCIAS;
    }

    xhr.send();

}