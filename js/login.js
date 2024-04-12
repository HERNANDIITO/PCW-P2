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
            alert(`Último inicio de sesión: ${r.ULTIMO_ACCESO}`)
            mustLogOut();
        } else {
            alert(`Error: ${r.DESCRIPCION}`)
        }
    }
    
    xhr.send(form); // formData
}