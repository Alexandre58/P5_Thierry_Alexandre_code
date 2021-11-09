import {
    checkIfCartEmpty,
    userInputVerification,
    idSendConfirm,
} from './function.js';

//La méthode split() divise une chaîne en un tableau de sous-chaînes et renvoie le tableau.Permet de séparer les données

/*La fonction suivante parcourt chaque clé présente dans le localStorage et affiche les valeurs correspondantes.
for (var i = 0; i < localStorage.length; i++) {
   alert(localStorage.getItem(localStorage.key(i)));
}*/
/**.closest 
 * La méthode la plus proche () en JavaScript est utilisée pour récupérer l'ancêtre le plus proche, ou le parent de l'élément correspond aux sélecteurs. Si aucun ancêtre n'est trouvé, la méthode renvoie null .

   Cette méthode parcourt l'élément et ses parents dans l'arborescence du document, et le parcours se poursuit jusqu'à ce que le premier nœud correspondant à la chaîne de sélection fournie soit trouvé.
 */
/**.dataset.************
 *  L'objet au format JSON dataset est accessible en écriture : modifier cet objet a un effet automatique et immédiat sur le DOM.

Pour rappel les attributs commençant par data- permettent de stocker des informations texte sur chaque élément du DOM.
Même si l'attribut n'existe pas dans la norme HTML W3C, aucune erreur n'est reportée lors de l'exercice de validation de code.
 */
/**.removeItem*****************
 * La méthode removeItem()de l'interface Storage, lorsque vous passez une clé en argument, va supprimer la ressource avec le nom de la clé correspondante du stockage. L'interface Storagede l'API Web Storage API fournit des accès particuliers dans les domaines des stockages locaux et des sessions.

   Si aucun élément n'est donné en paramètre nomCle, cette méthode ne fait rien.
 */
/**addeventListenner('change',.. **************.L'événement change est déclenché pour les éléments <input> (entrée), <select> (sélection) et <textarea> (zone de texte) lorsqu'un changement de leur valeur est réalisé par l'utilisateur.
 * Propagation	Oui
 */
/**
 * La fonction parseInt() *******************analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
 */
//. remove()****** La Element.remove()méthode supprime l'élément de l'arbre auquel il appartient.
//*****La méthode JSON.stringify()***** convertit une valeur JavaScript en chaîne JSON. Optionnellement, elle peut remplacer des valeurs ou spécifier les propriétés à inclure si un tableau de propriétés a été fourni.
const idSectionContainercartHtml = document.querySelector('#cart__items');
const userFormSubmit = document.getElementById('order');
let totalPriceDisplay = document.getElementById('totalPrice');
const totalQuantityDisplay = document.getElementById('totalQuantity');

/**
 * return key without color
 * @param {*} key
 * @returns {object}
 */
const recupInfoIdProduct = async (key) => {
    let keyCorlors = localStorage.key(key);
    //idColorArray return key/color on tab with two element 0 = key 1 ,(.split)= color
    let idColorArray = keyCorlors.split(',');
    //recup one value on the table [id]
    let itemId = idColorArray[0];
    try {
        let response = await fetch(
            `http://localhost:3000/api/products/${itemId}`
        );
        return await response.json();
    } catch (error) {
        alert('Error : ' + error);
    }
};
/**
 * delete article panier class="deleteItem" (supprimer) ligne 66 cart.html
 */
const deleteArticleNbr = () => {
    let deleteProducListBtn = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < deleteProducListBtn.length; i++) {
        deleteProducListBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            //select parent for close
            let articleDOM = deleteProducListBtn[i].closest('article');
            let itemId = articleDOM.dataset.id;
            //reucp données
            let itemColor = articleDOM.dataset.color;
            let itemQuantity = localStorage.getItem(localStorage.key(i));
            let localStorageKey = [itemId, itemColor];
            //delete localstorage itemId , itemColor,itemQuantity
            localStorage.removeItem(localStorageKey, itemQuantity);
            articleDOM.remove();

            //display html (class ="itemQuantity" )
            displayNumberTotalPanier();
        });
    }
};
/**ligne 63 cart.html
 * input number Quantity(class ="itemQuantity" ) possibility addition and send in localStorage
 * ?number == 0 message error : send localstorage
 */
const refreshAndSendTheNumber = () => {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < quantitySelector.length; i++) {
        quantitySelector[i].addEventListener('change', (e) => {
            e.preventDefault();
            //return Ancestor value
            let articleDOM = quantitySelector[i].closest('article');
            //return id data
            let itemId = articleDOM.dataset.id;;
            //return choise color data
            let itemColor = articleDOM.dataset.color;
            //return chooise id and colors localStorage
            let localStorageKey = [itemId, itemColor];
            //recup event change addeventListener
            let itemQuantity = e.target.value;
            if (itemQuantity == 0) {
                alert(
                    'Il devrait y avoir au moins un Kanapé dans la commande ! Merci de refaire un choix'
                );
            }
            //send in localStorage Key and Number
            localStorage.setItem(localStorageKey, itemQuantity);
            displayNumberTotalPanier();
        });
    }
};
/**
 * return the number of Kanap chosen
 * display html (class ="itemQuantity" ligne 63)
 * return {number}
 */
const displayNumberTotalPanier = () => {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    let itemAmount = 0;
    for (let i = 0; i < quantitySelector.length; i++) {
        //return entier
        itemAmount += parseInt(quantitySelector[i].value);
    }
    //ligne 73 cart.html display total (number) articles
    totalQuantityDisplay.innerHTML = itemAmount;
    //Display Total addition price panier(id='totalPrice) when we add several sofas
    displayTotalPrice();
    //if localStorage empty ,return accueil
    checkIfCartEmpty();
};
/**
 * Display Total price panier(id='totalPrice ligne 73) when we add several sofas
 */
const displayTotalPrice = () => {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    let totalCartPrice = 0;
    for (let i = 0; i < quantitySelector.length; i++) {
        //quantitySelector[i] ={objet}
        let articleDOM = quantitySelector[i].closest('article');
        //recup individual price
        let individualPrice = articleDOM.dataset.price;
        //multiply quantity * individual Article  transform with parseInt
        totalCartPrice += parseInt(quantitySelector[i].value) * individualPrice;
    }
    totalPriceDisplay.innerHTML = totalCartPrice;
};
/**
 * display list productList on panier
 */
(async () => {
    //return all commande on panier.html
    for (let key = 0; key < localStorage.length; key++) {
        //awwait response key
        //productList = key
        let productList = await recupInfoIdProduct(key);
        //display and
        idSectionContainercartHtml.innerHTML += `
		<article class="cart__item" data-id="${productList._id}" data-color="${
            localStorage.key(key).split(',')[1]
        }" data-price="${productList.price}">
			<div class="cart__item__img">
				<img src="${productList.imageUrl}" alt="${productList.altTxt}">
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__titlePrice">
					<h2>${productList.name}</h2>
					<p>${productList.price} €</p>
					<p>Coloris : ${localStorage.key(key).split(',')[1]}</p>
				</div>
				<div class="cart__item__content__settings">
					<div class="cart__item__content__settings__quantity">
						<p>Qté : </p>
						<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.getItem(
                            localStorage.key(key)
                        )}">
					</div>
					<div class="cart__item__content__settings__delete">
						<p class="deleteItem">Supprimer</p>
					</div>
				</div>
			</div>
		</article>
		`;
    }
    //Delect product panier
    deleteArticleNbr();
    //input number Quantity possibility addition and send in localStorage
    refreshAndSendTheNumber();
    //display html (class ="itemQuantity" )
    displayNumberTotalPanier();
    //Display Total addition price panier(id='totalPrice) when we add several sofas
    displayTotalPrice();
})();

/**
 * Validationn form (watch file function.js)
 */
userInputVerification();
/**
 * Button Command
 * userFormSubmit = class="order"
 */
userFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    //if input form is true send POST id localstorage
    if (userInputVerification()) {
        const products = idSendConfirm();
        const toSend = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products,
        };
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toSend),
        })
            .then((response) => response.json())
            .then((value) => {
                //clear the localStorage after command
                localStorage.clear();
                //redirection confirm.html
                document.location.href = `./confirmation.html?id=${value.orderId}`;
            })
            .catch((error) => {
                alert('Error: ' + error);
            });
    }
});
