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
