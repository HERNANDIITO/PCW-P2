var tags = [];

// TAGS

function getTagList() {
    const url = "api/etiquetas";
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responsetype = 'json';

    xhr.onload = function() {
        const r = JSON.parse(xhr.response);
        const tag_list = document.querySelector("#tag-list");
        r.FILAS.forEach(tag => {
            tag_list.innerHTML += `
                <option value="${tag.nombre}"></option>
            `
        });
    }

    xhr.send();
}

function appendTag(event) {
    event.preventDefault();
    const tag = document.querySelector("#tags").value;
    tags.push(tag);

    updateTags();
}

function updateTags() {
    const tagList = document.querySelector(".tags");
    let html = "";
    tags.forEach(tag => {
        html += `
        <div class="tag" id="${tag}">
            <i class="icon-tag"></i>
            <span>${tag}</span>
            <button onclick="removeTag(event, this)" class="tag-button">
                <i class="icon-cancel"></i>
            </button>
        </div>
        `
    })
    tagList.innerHTML = html;
}

function removeTag(event, button) {
    event.preventDefault();
    const tag = button.parentElement;
    tags = tags.filter(item => item !== tag.id);
    tag.remove();
}

// PHOTOS

var cont = 0;

function addPhotoCard(event) {
    event.preventDefault();

    const gallery = document.querySelector(".gallery");
    cont++;
    gallery.innerHTML += `
        <div class="photo-card">
            <header>
                <i class="icon-folder-open"></i>
                <button onclick="deletePhoto(event, this)"><i class="icon-cancel"></i></button>
            </header>
            <div class="image-input-group">
                <label for="image-${cont}">
                    <img src="imgs/clickHere.jpg" alt="Hac cilck aquí para subir una foto">
                </label>
                <input onchange="displayPhoto(this)" accept="image/*" id="image-${cont}" type="file">
                <div class="textarea-container">
                    <textarea placeholder="Escribe un comentario para tu foto..."></textarea>
                </div>
            </div>
        </div>
    `
}

function deletePhoto(event, button) {
    event.preventDefault();
    button.parentElement.parentElement.remove()
}

function displayPhoto(photo) { 
    let fichero = photo.files[0];

    if ( fichero ) {
        if ( fichero.size > 200000 ) {
            getModal(
                "Error al subir el archivo",
                `Tu archivo excede el peso límite de la plataforma.
                <br>
                Pesa de ${Math.floor((fichero.size / 1000) * 10) / 10} KB y permitimos un máximo de 200 KB`,
                false, "index.html"
            );
            return;
        }

        const file = URL.createObjectURL( fichero );
        const imgElement = photo.previousElementSibling.firstChild.nextElementSibling;
        imgElement.src = file;
    }
}

// MISC

function preventEnter(event, func) {
    if ( event.key == "Enter" ) {
        event.preventDefault();
        func(event);
    }
}