function isLogged() {
    try {
        const usu = JSON.parse(sessionStorage['datosUsu'])
        return usu && `${(usu).LOGIN}:${(usu).TOKEN}` ? `${(usu).LOGIN}:${(usu).TOKEN}` : false; 
    } catch {
        return false;
    }
}

function mustLogIn() {
    if (!isLogged()) {
        location.href = "index.html";
    }
}

function buildDifficultyHtml(diff) {
    html = "";
    for (let i = diff; i > 0; i--) {
        html += '<i class="icon-star"></i>';
    }
    
    for(let i = 3 - diff; i > 0; i--) {
        html += '<i class="icon-star-empty"></i>';
    }

    return html;
}

function mustLogOut() {
    if (isLogged()) {
        location.href = "index.html";
    }
}

// "RESULTADO":"OK",
// "CODIGO":200,
// "DESCRIPCION":"Logout realizado correctamente",
//  "LOGIN":"usuario4"

function logout(evt) {
    evt.preventDefault();
    const url = `api/usuarios/logout`;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', isLogged());
    xhr.responseType = 'json';
    xhr.onload = function() {
        const response = xhr.response;
        if ( response.RESULTADO == "OK" ) {
            window.sessionStorage.removeItem('datosUsu')
            location.reload();
        }
    }

    xhr.send()
}

function getNavBar() {
    let html = `
    <a href="index.html"><img src="imgs/logo.svg" alt=""></a>
    <h1>Recetas de toda la vida</h1>
    <label for="toggleMenu"><i class="demo-icon icon-menu"></i>Menú</label>
    <input type="checkbox" id="toggleMenu">`;

    isLogged() ? html += `
    <nav>
        <a href="index.html">   <i class="icon-home">     </i> <span>Inicio   </span>  </a>
        <a href="buscar.html">  <i class="icon-search">   </i> <span>Buscar   </span>  </a>
        <a href="nueva.html">   <i class="icon-doc-add">  </i> <span>Nueva    </span>  </a>
        <a onclick="logout(event);" href="index.html">   <i class="icon-logout">   </i> <span>Logout   </span>  </a>
    </nav>
    ` : html += `
    <nav>
        <a href="index.html">   <i class="icon-home">     </i> <span>Inicio   </span>  </a>
        <a href="buscar.html">  <i class="icon-search">   </i> <span>Buscar   </span>  </a>
        <a href="login.html">   <i class="icon-login">    </i> <span>Login    </span>  </a>
        <a href="registro.html"><i class="icon-user-plus"></i> <span>Registro </span>  </a>
     </nav>`

    document.querySelector(".navbar").innerHTML = html;
}

function getModal( title, body, redirect, url ) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', "modal.html", true);
    xhr.onload = function() {
        const html = xhr.responseText.replace("title-text", title).replace("body-text", body).replace("closeModal()", `closeModal(${redirect}, '${url}')`);

        document.querySelector("html").innerHTML = html + document.querySelector("html").innerHTML;
        document.querySelector("html").classList.add("modal-open");
    };

    xhr.send();
}

function closeModal(redirect, page) {
    document.querySelector(".modal-background").remove()
    document.querySelector("html").classList.remove("modal-open");
    if ( redirect ) {
        location.href = `${page}`
    }
}