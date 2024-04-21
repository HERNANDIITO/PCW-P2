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

var ini = true;

function getURL( evt ) {
    console.log("getURL!")
    if (evt) {
        evt.preventDefault();
    }

    const fd = new FormData( document.querySelector(".form") )
    let url = 'api/recetas',
        cont = 0;

        
    if ( ini ) {
        pedirRecetas(url + window.location.search);
        ini = false;
        return;
    }

    for ( const [key, value] of fd.entries() ) {
        if ( value != "" ) {
            if ( cont == 0 ) {
                url += '?';
                cont++;
            } else {
                url += '&';
            }

            url += `${key}=${value}`; 
        }
    }

    const difficulty = document.querySelector("#difficulty").value;

    if ( difficulty > 0 ) {
        if ( cont == 0 ) {
            url += `?d=${difficulty}`
        } else {
            url += `&d=${difficulty}`
        }
    }

    console.log(url);

    pedirRecetas(url);
}

function preventEnter(event) {
    if ( event.key == "Enter" ) {
        event.preventDefault();
        getURL(event);
    }
}