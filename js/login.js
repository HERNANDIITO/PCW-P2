function login(event) {
    event.preventDefault();
    
    const form = new FormData(document.querySelector(".form"));
    const url = "api/usuarios/login";
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.responsetype = 'json';
    xhr.onload = function() {
        let r = xhr.response;
        r = JSON.parse(r);
        if ( r.RESULTADO == 'OK' ) {
            sessionStorage['datosUsu'] = JSON.stringify(r);
            getModal("Sesión iniciada con éxito", `Último inicio de sesión: ${r.ULTIMO_ACCESO}`, true, "index.html");
        } else {
            getModal("Error al iniciar sesción", `${r.DESCRIPCION}`, false, "")
        }
    }
    
    xhr.send(form); // formData
}