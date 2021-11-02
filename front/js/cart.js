import {
    checkIfCartEmpty,
    userInputVerification,
    idSendConfirm,
} from './function.js';

const idSectionContainercartHtml = document.querySelector('#cart__items');
let userFormSubmit = document.getElementById('order');
/**
 * return key without color
 * @param {*} key
 * @returns {object}
 */
const recupInfoIdProduct = async (key) => {
    let keyCorlors = localStorage.key(key);
    console.log(keyCorlors);
    let idColorArray = keyCorlors.split(',');
    console.log(idColorArray);
    let itemId = idColorArray[0];
    console.log(itemId);
    try {
        let response = await fetch(
            `http://localhost:3000/api/products/${itemId}`
        );
        console.log(typeof response);
        return await response.json();
    } catch (error) {
        console.log('Error : ' + error);
    }
};

/**
 * display list productList on panier
 */
(async () => {
    //return all commande on panier.html
    for (let key = 0; key < localStorage.length; key++) {
        let productList = await recupInfoIdProduct(key);
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
    //Display Total price panier(id='totalPrice)
    displayTotalPrice();
})();
/**
 * delete article panier
 */
function deleteArticleNbr() {
    let deleteItemBtns = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < deleteItemBtns.length; i++) {
        deleteItemBtns[i].addEventListener('click', (e) => {
            e.preventDefault();

            let articleDOM = deleteItemBtns[i].closest('article');
            let itemId = articleDOM.dataset.id;
            let itemColor = articleDOM.dataset.color;
            let itemQuantity = localStorage.getItem(localStorage.key(i));
            let localStorageKey = [itemId, itemColor];

            localStorage.removeItem(localStorageKey, itemQuantity);
            articleDOM.remove();

            //display html (class ="itemQuantity" )
            displayNumberTotalPanier();
        });
    }
}
/**
 * input number Quantity(class ="itemQuantity" ) possibility addition and send in localStorage
 */
function refreshAndSendTheNumber() {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < quantitySelector.length; i++) {
        quantitySelector[i].addEventListener('change', (e) => {
            e.preventDefault();
            //return Ancestor value
            let articleDOM = quantitySelector[i].closest('article');
            //return id data
            let itemId = articleDOM.dataset.id;
            console.log(itemId);
            //return choise color data
            let itemColor = articleDOM.dataset.color;
            console.log(itemColor);
            //return chooise id and colors localStorage
            let localStorageKey = [itemId, itemColor];
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
}
/**
 * display html (class ="itemQuantity" )
 */
function displayNumberTotalPanier() {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    let itemAmount = 0;
    for (let i = 0; i < quantitySelector.length; i++) {
        //return entier
        itemAmount += parseInt(quantitySelector[i].value);
        console.log(itemAmount);
    }
    const totalQuantityDisplay = document.getElementById('totalQuantity');
    totalQuantityDisplay.innerHTML = itemAmount;
    console.log(itemAmount);
    displayTotalPrice();
    //if localStorage empty ,return accueil
    checkIfCartEmpty();
}
/**
 * Display Total price panier(id='totalPrice)
 */
function displayTotalPrice() {
    let quantitySelector = document.querySelectorAll('.itemQuantity');
    let totalCartPrice = 0;
    for (let i = 0; i < quantitySelector.length; i++) {
        let articleDOM = quantitySelector[i].closest('article');
        let individualPrice = articleDOM.dataset.price;
        totalCartPrice += parseInt(quantitySelector[i].value) * individualPrice;
    }
    let totalPriceDisplay = document.getElementById('totalPrice');
    totalPriceDisplay.innerHTML = totalCartPrice;
}
/**
 * Vérication form watch function.js
 */
userInputVerification();

/**
 * Button Command
 * userFormSubmit = class="order"
 */
userFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    //if input form is true send POST id localst
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
        console.log(products);
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
                console.log('Error: ' + error);
            });
    }
});
