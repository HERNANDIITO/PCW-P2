function register(event) {
    event.preventDefault();

    
    const form = new FormData(document.querySelector(".form"));
    
    checkUsu();
    checkPass();
    checkPassRep();
    checkEmail();

    if ( document.querySelector(".error-msg") ) { return; }

    const url = "api/usuarios/registro";
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.responsetype = 'json';

    xhr.onload = function() {
        const r_reg = JSON.parse(xhr.response);

        if ( r_reg.RESULTADO == "OK" ) {
            getModal(r_reg.DESCRIPCION, `Este es tu usuario: ${r_reg.LOGIN}`, true, "login.html")
            hideError( "usu_input" )
        } else {
            showError("usu_input", r_reg.DESCRIPCION) 
        }
    }

    xhr.send(form);
}

function checkUsu() {
    const form = new FormData(document.querySelector(".form"));
    
    if ( form.get("usu") == "" ) {
        showError("usu_input", "Escribe un usuario.")
    } else {
        const form = new FormData(document.querySelector(".form"));
        const url = `api/usuarios/${form.get("username")}`;
        const xhr = new XMLHttpRequest();
    
        xhr.open('GET', url, true);
        xhr.responsetype = 'json';
        xhr.onload = function() {
            const r_login = JSON.parse(xhr.response);
            if ( r_login.RESULTADO == "OK" ) {
                hideError("usu_input")
            }
        }
        
        xhr.send();
    }
}

function checkPass() {
    const form = new FormData(document.querySelector(".form"));
    const pass = form.get("pwd");

    if ( pass == "" ) {
        showError("pass_input", "Escribe una contraseña.")
    } else if (pass.length < 4) {
        showError("pass_input", "Debe contener 4 caracteres o más.")
    } else {
        hideError( "pass_input" )
    }
}

function checkPassRep() {
    const form = new FormData(document.querySelector(".form"));

    if ( form.get("pwd") != form.get("pwd2") ) {
        showError("rep_pass", "Las contraseñas no coinciden.")
    } else {
        hideError( "rep_pass" )
    }
}

function checkEmail() {
    const form = new FormData(document.querySelector(".form"));
    const email = form.get("email");

    if ( email == "" ){
        showError("email_input", "No ha rellenado el campo.")
    } else if ( !email.includes("@") ) {
        showError("email_input", "Esta no es una dirección de correo válida.")
    } else {
        hideError( "email_input" )
    }
}

function hideError( selector ) {
    try {
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

    let error = document.createElement("div");
    error.className = "error-msg";
    error.id = `${selector}-error`;
    error.innerHTML = `
        <i class="icon-cancel"></i>
        <p>
            ${text}
        </p>
    `;

    document.querySelector(`#${selector}`).appendChild(error);

}