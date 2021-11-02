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
    console.log(url);
    console.log(location.href);
    console.log(url.search);
    //acces aux arguments decodé de la requete get dans l'url
    let idUrlRecup = new URLSearchParams(url.search);
    //verif si la clé id est presente avec la methode .has() qui renvoi un boolean
    console.log(idUrlRecup);
    //if key = true return returnId else error
    if (idUrlRecup.has('id')) {
        let returnId = idUrlRecup.get('id');
        console.log(returnId);
        console.log(typeof returnId);
        return returnId;
    } else {
        //message d'erreur si soucis d'affichage
        console.log('Cette adresse ne correspond pas a la page demandée');
    }
};
/**
 *  get et verif the response "information product display page"
 */
let productsList = [];
(async () => {
    let id = verifIsAGoodUrl();
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            productsList = data;
            console.log(productsList);
        })
        .catch((error) => {
            alert('Merci de recharger la page, une erreur est survenue !');
        });
    
    console.log(`
    ${productsList.colors[0]}
    ${productsList.colors[1]}
    ${productsList.colors[2]}
    `);
    
    //Display product.html
    classItem__img.innerHTML = `<img src="${productsList.imageUrl}" alt="${productsList.alt}">`;
    idTittle.textContent = productsList.name;
    idPrice.textContent = productsList.price;
    idDescription.textContent = productsList.description;
    //display choise colors
    productsList.colors.forEach((color) => {
        idColors.innerHTML += `<option value="${color}">${color}</option>`;
        console.log(color);
    });
})();


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
        console.log(itemId);
        console.log(itemColor);
        console.log(itemInCart);
        console.log(itemInCart[0]);
        console.log(itemInCart[1]);
        console.log(localStorage);
        console.log(localStorage.key);
    }
});