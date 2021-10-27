const classItem__img = document.querySelector(".item__img");
const idTittle = document.querySelector("#title"); 
const idDescription = document.getElementById("description");
const idPrice = document.getElementById("price");
const idColors = document.getElementById("colors"); //choix colors dasn le <select> <option>
const addToCartBtn = document.getElementById("addToCart");//btn d'envoi vers cart.html(panier)
class Kanap {
  constructor(name,image,description,altTxt,price,id , color){
      this.name = name ;
      this.image = image;
      this.description = description;
      this.altTxt = altTxt;
      this.price = price;
      this.id = id;
      this.color = color;

  }
};






// recuperation de l'url produit cliqué par l'utilisateur a partir de la page d'acceuil 
/**
 * 
 * @returns string
 */
const verifIsAGoodUrl =()=> {
    // page actuel http 
    let url = new URL(window.location.href);
                                                                      console.log(location.href);
    //acces aux arguments decodé de la requete get dans l'url
    let idUrlRecup = new URLSearchParams(url.search);
    //verif si la clé id est presente avec la methode .has() qui renvoi un boolean
    console.log(idUrlRecup);
    if (idUrlRecup.has("id")) {
        let  returnId = idUrlRecup.get("id");
                                                                  console.log(typeof returnId);
      return returnId;
    } else {
        //message d'erreur si soucis d'affichage 
        console.log("Cette adresse ne correspond pas a la page demandée");
    }
  }
  // obtenir et verif la reponse "" information du produit de la page affichée dans une function ""

let productsListe =[];

const fetchPoduct =  async () => {
  let id = verifIsAGoodUrl();
 await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res)=>res.json())
    .then((data)=> {
       productsListe = data;
    console.log(productsListe);
    })
    .catch((error)=>{
        alert("Merci de recharger la page, une erreur est survenue !");
    })
};
fetchPoduct();
  console.log(productsListe);
  // Faire le rendu dans la page product.html
 (async () => {
      //valueOfId retourne les produit de l'api de la page affichée
    let valueOfId = await fetchPoduct();
                                                                                  console.log(productsListe);
    classItem__img.innerHTML += `<img src="${productsListe.imageUrl}" alt="${productsListe.altTxt}">`;
    idTittle.innerHTML += productsListe.name;
    idPrice.innerHTML += productsListe.price;
    idDescription.innerHTML += productsListe.description;
    // boucle sur les chois de couleurs dans le select option
    productsListe.colors.forEach((color) => {  
      idColors.innerHTML += `<option value="${color}">${color}</option>`;
                                                                              console.log(idColors);
    });
  })();
  
  // Add LocalStorage to card
  addToCartBtn.addEventListener("click", () => {
    const itemId = verifIsAGoodUrl();
    const itemColor = document.getElementById("colors").value;
    const itemQuantity = document.getElementById("quantity").value;
    // Confirm color and quantity != 0
    if (itemColor === "") {
      alert("Il est nécessaire de choisir une couleur");
    } else if (itemQuantity == 0) {
      alert("Il faut au moins ajouter un Kanap");
    } else {
      //envoi dans le localStorage
     
      //tableau retourne clé/couleur
      const itemInCart = [itemId, itemColor];
      //retourne dans le localStorage (clé/couleur , value = quantité)
      localStorage.setItem(itemInCart, itemQuantity);
      //location.href renvoi vers cart.html(panier)
        window.location.href = "./cart.html";
                                                            console.log(itemInCart[0]);
                                                            console.log(itemInCart[1]);
                                                            console.log(localStorage);
                                                            console.log(localStorage.key);
   
    }
  });
 
  