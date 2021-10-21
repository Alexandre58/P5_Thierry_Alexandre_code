const item = document.querySelector(".item"); //container section container article
const itemImg = document.querySelector(".item__img"); //img product
const idTitle = document.querySelector("#title"); //h1 title
const idPrice = document.querySelector("#price"); //price p
const idDescription = document.querySelector("#description"); //description
const idColors = document.querySelector("#colors"); //select colors name color-select
const idQuantity = document.querySelector("#quantity"); //input quantity
const idAddToCart = document.querySelector("#addToCart"); //button add to cart typt number
//end container article
console.log(item);
console.log(itemImg);
console.log(idTitle);
console.log(idPrice);
console.log(idDescription);
console.log(idColors);
console.log(idQuantity);
console.log(idAddToCart);
//recup de l'url de la page chargéé
console.log(window.location.href);
console.log(window.location);
//list product in tab productsListe
var newUrl = new URL(location.href).searchParams.get("id");
console.log(newUrl);
let productsListeArticles = [];
const fetchPoductArticles = async () => {

    await fetch(`http://localhost:3000/api/products/${newUrl}`)
        .then((res) => res.json())
        .then((data) => {
            productsListeArticles = data;
            console.log(productsListeArticles);
        })
        .catch((error) => {
            alert("Merci de recharger la page, une erreur est survenue !");
        });
};

//affichage des elements
/*var newImg = document.createElement("img");*/
const productDisplayArticles = async () => {
    console.log("yes");
    await fetchPoductArticles();
    console.log(productsListeArticles.description );
    console.log(productsListeArticles.name);
    console.log(productsListeArticles.price);
                   /*  itemImg. `<img src="${list.imageUrl}" alt="${list.altTxt}" width="160" height="160"></img> `;*/
                     idTitle.textContent = ` ${productsListeArticles.name} `;
                     idPrice.textContent = ` ${productsListeArticles.price} `;
                     idDescription.textContent = ` ${productsListeArticles.description} `;
};
productDisplayArticles();


