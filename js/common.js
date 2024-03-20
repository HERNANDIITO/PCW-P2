function isLogged() {
    return sessionStorage['datosUsu'] ? sessionStorage['datosUsu'] : false; 
}

function mustLogIn() {
    if (!isLogged()) {
        window.location.replace("index.html")
    }
}

function mustLogOut() {
    if (isLogged()) {
        window.location.replace("index.html")
    }
}

function logout() {
    window.sessionStorage.removeItem('datosUsu')
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
        <a onclick="logout();" href="index.html">   <i class="icon-logout">   </i> <span>Logout   </span>  </a>
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
