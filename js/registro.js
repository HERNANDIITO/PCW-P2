function register(event) {
    event.preventDefault();
    
    const form = new FormData(document.querySelector(".form"));
    const url = `api/usuarios/${form.get("username")}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responsetype = 'json';
    xhr.onload = function() {
        const r_login = JSON.parse(xhr.response);
        
        const url2 = "api/usuarios/registro";
        const xhr2 = new XMLHttpRequest();

        xhr2.open('POST', url2, true);
        xhr2.responsetype = 'json';

        xhr2.onload = function() {
            const r_reg = JSON.parse(xhr2.response);
            console.log(r_reg)
            console.log(form)

            if ( r_reg.RESULTADO == "OK" ) {
                getModal(r_reg.DESCRIPCION, `Este es tu usuario: ${r_reg.LOGIN}`, true, "login.html")
                hideError( "usu_input" )
            } else {
                showError("usu_input", r_reg.DESCRIPCION) 
            }
        }

        let test = false;

        if ( form.get("pwd") != form.get("pwd2") ) {
            showError("rep_pass", "Las contraseñas no coinciden")
            test = true;
        } else {
            hideError( "rep_pass" )
        }
        
        if ( form.get("pwd") == "" ) {
            showError("pass_input", "Escribe una contraseña")
            test = true;
        } else {
            hideError( "pass_input" )
        }

        if ( form.get("usu") == "" ) {
            showError("usu_input", "Escribe un usuario")
            test = true;
        } else {
            hideError( "usu_input" )
        }
        
        if ( form.get("email") == "" ){
            showError("email_input", "No ha rellenado el campo")
            test = true;
        } else {
            hideError( "email_input" )
        }

        if ( test ) { return; }

        xhr2.send(form);

    }
    
    xhr.send();
}

function hideError( selector ) {
    try {
        console.log(`${selector}-error`)
        document.querySelector(`#${selector}-error`).remove();
    } catch {}
}

function showError( selector, text ) {

    let alreadyShown = false;

    document.querySelector(`#${selector}`).childNodes.forEach(node => {
        if ( node.className == "error-msg" ) {
            alreadyShown = true;
        }
    });

    if ( alreadyShown ) { return; }

    document.querySelector(`#${selector}`).innerHTML += `
        <div class="error-msg" id="${selector}-error">
            <i class="icon-cancel"></i>
            <p>
                ${text}
            </p>
        </div>
    `;

}