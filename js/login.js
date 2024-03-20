function login( evt ) {
    xhr.open('POST', url, true);
    xhr.responsetype = 'json';
    xhr.onload = function() {
        let r = xhr.respone;
        console.log(r);
        if ( r.RESULTADO == 'OK' ) {
            sessionStorage['datosUsu'] = JSON.stringify(r);
        }
    }
    xhr.send(fd); // formData
}