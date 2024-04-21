var tags = [];
var ingredients = [];
var photos = [];

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

// INGREDIENTES

function appendIngredient(event) {
    event.preventDefault();
    const ingredient = document.querySelector("#ingredients").value;
    ingredients.push(ingredient);

    updateIngredients();
}

function updateIngredients() {
    const IngredientList = document.querySelector(".ingredients-list");
    let html = "";
    ingredients.forEach(ingredient => {
        html += `
            <li>
                <span>${ingredient}</span> 
                <button onclick="removeIngredient(event, this)" class="tag-button">
                    <i class="icon-cancel"></i>
                </button>
            </li>
        `
    })
    IngredientList.innerHTML = html;
}

function removeIngredient(event, button) {
    event.preventDefault();
    const ingredient = button.parentElement;
    ingredients = ingredients.filter(item => item !== ingredient.firstElementChild.innerText);
    ingredient.remove();
}

// PHOTOS

var cont = 0;

function addPhotoCard(event) {
    event.preventDefault();

    const gallery = document.querySelector(".gallery");
    cont++;
    const newCard = document.createElement("div");
    newCard.className = "photo-card";
    newCard.innerHTML = `
        <header>
            <i class="icon-folder-open"></i>
            <button onclick="deletePhoto(event, this)"><i class="icon-cancel"></i></button>
        </header>
        <div class="image-input-group">
            <label for="image-${cont}">
                <img src="imgs/clickHere.jpg" alt="Hac cilck aquí para subir una foto">
            </label>
            <input name="fotos[]" onchange="displayPhoto(this)" accept="image/*" id="image-${cont}" type="file">
            <div class="textarea-container">
                <textarea name="descripciones[]" class="desc" id="textarea-${cont}" placeholder="Escribe un comentario para tu foto..."></textarea>
            </div>
        </div>
    `

    gallery.appendChild(newCard);
}

function deletePhoto(event, button) {
    event.preventDefault();
    const photo = button.parentElement.nextElementSibling.firstElementChild.firstElementChild.src;
    photos = photos.filter(item => item !== photo);
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
        photos.push(file);
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

function uploadRecipe(event) {
    event.preventDefault();
    const form = document.querySelector(".form");
    const formData = new FormData(form);

    if ( photos.length <= 0 ) {
        getModal(
            "Error al subir la receta",
            `La receta debe contener como mínimo una imagen.`,
            false, "index.html"
        );
        return;
    }
    
    ingredients.forEach(ing => {
        formData.append('ingredientes[]', ing);
    })

    tags.forEach(tag => {
        formData.append('etiquetas[]', tag);
    })

    const url = "api/recetas";
    const xhr = new XMLHttpRequest();

    console.log(formData)

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', isLogged());
    xhr.responsetype = 'json';
    xhr.onload = function() {
        let r = xhr.response;
        console.log(r)
    }
    
    xhr.send(formData); 
}