function getParams() {
    const params = new URLSearchParams(window.location.search);
    let url = 'api/recetas';

    if ( !params ) {
        pedirRecetas(url);
    } else {
        pedirRecetas(url + window.location.search)
    }
}

function pedirRecetas( url ) {

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

            for (let i = receta.dificultad; i > 0; i--) {
                html += '<i class="icon-star"></i>';
            }
            
            for(let i = 3 - receta.dificultad; i > 0; i--) {
                html += '<i class="icon-star-empty"></i>';
            }

            html += `
                        Dificultad
                        </p>
                        <p><i class="icon-clock"></i>${receta.tiempo} min</p>
                    </div>
                </div>
            </article>`;
        });

        document.querySelector(".latest").innerHTML = html;
    }

    xhr.send();

}

function getURL( evt ) {
    evt.preventDefault();
    const fd = new FormData( document.querySelector(".form") )
    let url = 'api/recetas',
        cont = 0;

    for ( const [key, value] of fd.entries() ) {
        console.log(value)
        if ( value == "" ) {
            if ( cont == 0 ) {
                url += '?';
                cont++;
            } else {
                url += '&';
            }

            url += `${key}=${value}`; 
        }
    }

    console.log(url);

    pedirRecetas(url);
}