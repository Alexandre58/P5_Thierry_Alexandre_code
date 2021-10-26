const classItem__img = document.querySelector(".item__img");
const idTittle = document.querySelector("#title"); 
const idDescription = document.getElementById("description");
const idPrice = document.getElementById("price");
const idColors = document.getElementById("colors"); //choix colors dasn le <select> <option>
const addToCartBtn = document.getElementById("addToCart");//btn d'envoi vers cart.html(panier)

// recuperation de l'url produit cliqué par l'utilisateur a partir de la page d'acceuil 
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
                                                                  console.log(returnId);
      return returnId;
    } else {
        //message d'erreur si soucis d'affichage 
        console.log("Cette adresse ne correspond pas a la page demandée");
    }
  }

  // obtenir et verif la reponse "" information du produit de la page affichée dans une function ""
const getInfoByIdAPI = async()=> {
    let id = verifIsAGoodUrl();
    try {
      let response = await fetch(`http://localhost:3000/api/products/${id}`);
                                                                             console.log(response);
      return await response.json(); 
      
    } catch (error) {
      console.log("Erreur  : " + error);
    }
  }
  
  // Faire le rendu dans la page product.html
 (async () => {
      //valueOfId retourne les produit de l'api de la page affichée
    let valueOfId = await getInfoByIdAPI();
                                                                                  console.log(valueOfId);
    classItem__img.innerHTML += `<img src="${valueOfId.imageUrl}" alt="${valueOfId.altTxt}">`;
    idTittle.innerHTML += valueOfId.name;
    idPrice.innerHTML += valueOfId.price;
    idDescription.innerHTML += valueOfId.description;
    // boucle sur les chois de couleurs dans le select option
    valueOfId.colors.forEach((color) => {  
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
  