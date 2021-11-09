import {Kanap} from "./Modelkanap.js";
const classItem__img = document.querySelector('.item__img');
const idTittle = document.querySelector('#title');
const idDescription = document.getElementById('description');
const idPrice = document.getElementById('price');
const idColors = document.getElementById('colors'); //choix colors dasn le <select> <option>
const addToCartBtn = document.getElementById('addToCart'); //btn d'envoi vers cart.html(panier)


/**
 *
 * @returns string
 */
const verifIsAGoodUrl = () => {
    // page actuel http
    let url = new URL(window.location.href);
    //acces aux arguments decodé de la requete get dans l'url
    let idUrlRecup = new URLSearchParams(url.search);
    //verif si la clé id est presente avec la methode .has() qui renvoi un boolean
    //if key = true return returnId else error
    if (idUrlRecup.has('id')) {
        let returnId = idUrlRecup.get('id');
        return returnId;
    } else {
        //message d'erreur si soucis d'affichage
        alert('Cette adresse ne correspond pas a la page demandée');
    }
};
/**
 *  get et verif the response "information product display page"
 */
let id = verifIsAGoodUrl();
fetch(`http://localhost:3000/api/products/${id}`)
        .then(data => data.json())
        .then(jsonListArticle => {
                    let kanapUnity = new Kanap(jsonListArticle)
                        //Display product.html
                        classItem__img.innerHTML = `<img src="${kanapUnity.imageUrl}" alt="${kanapUnity.alt}">`;
                        idTittle.textContent = kanapUnity.name;
                        idPrice.textContent = kanapUnity.price;
                        idDescription.textContent = kanapUnity.description;
                        //display choise colors
                        kanapUnity.colors.forEach((color) => {
                            idColors.innerHTML += `<option value="${color}">${color}</option>`;
                        });                    
});

// Add LocalStorage to card
addToCartBtn.addEventListener('click', () => {
    const itemId = verifIsAGoodUrl();
    const itemColor = document.getElementById('colors').value;
    const itemQuantity = document.getElementById('quantity').value;
    // Confirm color and quantity != 0
    if (itemColor === '') {
        alert('Il est nécessaire de choisir une couleur');
    } else if (itemQuantity == 0) {
        alert('Il faut au moins ajouter un Kanap');
    } else {
        //table return clé/couleur
        const itemInCart = [itemId, itemColor];
        //return localStorage (clé/couleur together + value = quantité)
        localStorage.setItem(itemInCart, itemQuantity);
        //window.location.href return to cart.html(panier)
        window.location.href = "./cart.html";
    }
});