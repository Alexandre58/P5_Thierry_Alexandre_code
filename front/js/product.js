import { Kanap } from './Modelkanap.js';
import { verifIsAGoodUrl } from './function.js';
const classItem__img = document.querySelector('.item__img');
const idTittle = document.querySelector('#title');
const idDescription = document.getElementById('description');
const idPrice = document.getElementById('price');
const idColors = document.getElementById('colors'); //choix colors dasn le <select> <option>
const addToCartBtn = document.getElementById('addToCart'); //btn d'envoi vers cart.html(panier)

/**
 *  get et verif response "information product display page"
 * verifIsGood = recup id in Url 
 */
let id = verifIsAGoodUrl();
const displayKanapUnity = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((data) => data.json())
        .then((jsonListArticle) => {
            let kanapUnity = new Kanap(jsonListArticle);
            //Display product.html
            classItem__img.innerHTML = `<img src="${kanapUnity.imageUrl}" alt="${kanapUnity.alt}">`;
            idTittle.textContent = kanapUnity.name;
            idPrice.textContent = kanapUnity.price;
            idDescription.textContent = kanapUnity.description;
            //display choise colors
            kanapUnity.colors.forEach((color) => {
                idColors.innerHTML += `<option value="${color}">${color}</option>`;
            });
        })
        .catch((error) => {
            alert('Merci de recherger la page, une erreur est survenue !');
        });
};
displayKanapUnity();

// Add LocalStorage to card

addToCartBtn.addEventListener('click', () => {
    const itemId = verifIsAGoodUrl();
    const itemColor = document.getElementById('colors').value;
    const itemQuantity = parseInt(document.getElementById('quantity').value);
    // Confirm color and quantity != 0
    if (itemColor === '') {
        alert('Il est nécessaire de choisir une couleur');
    } else if (itemQuantity === 0) {
        alert('Il faut au moins ajouter un Kanap');
    } else {
        //table return clé/couleur
        const itemInCart = [itemId, itemColor];
        //recup localstorage
        let actualQuantityBrut = localStorage.getItem(itemInCart);
        //condition
        let actualQuantity = actualQuantityBrut === null ? 0 : parseInt(actualQuantityBrut);
        //return localStorage (clé/couleur together + value = quantité)
      
        localStorage.setItem(itemInCart, itemQuantity + actualQuantity);
       
        //window.location.href return to cart.html(panier)
        window.location.href = './cart.html';
    }
});


  
