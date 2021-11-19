import {
    checkIfCartEmpty,
    idSendConfirm
} from './function.js';
import { userInputVerification } from './formulaire.js';

const idSectionContainercartHtml = document.querySelector('#cart__items');
const userFormSubmit = document.getElementById('order');
let totalPriceDisplay = document.getElementById('totalPrice');
const totalQuantityDisplay = document.getElementById('totalQuantity');
let totalCartPrice = 0;
/*
 * return key without color localstorage
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
            //reucp données id
            let itemId = articleDOM.dataset.id;
            //recup donnée color
            let itemColor = articleDOM.dataset.color;
            //recup quantity
            let itemQuantity = localStorage.getItem(localStorage.key(i));
            //table id and color
            let localStorageKey = [itemId, itemColor];
            //delete localstorage itemId , itemColor,itemQuantity
            localStorage.removeItem(localStorageKey, itemQuantity);
            //delete article Dom
            articleDOM.remove();
            //calculate new data
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
            let itemId = articleDOM.dataset.id;
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
            //calculation new price
            displayNumberTotalPanier();
        });
    }
};
/**
 * return the number of Kanap chosen
 * display html (class ="itemQuantity" ligne 63)
 * @return {number}
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
    totalCartPrice = 0;
    for (let i = 0; i < quantitySelector.length; i++) {
        //quantitySelector[i] ={objet} return article html
        let articleDOM = quantitySelector[i].closest('article');
        //recup individual price return price of article display
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
        //return key color
        let keyColor = localStorage.key(key).split(',')[1];
        //display and
        idSectionContainercartHtml.innerHTML += `
		<article class="cart__item" data-id="${
            productList._id
        }" data-color="${keyColor}" data-price="${productList.price}">
			<div class="cart__item__img">
				<img src="${productList.imageUrl}" alt="${productList.altTxt}">
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__titlePrice">
					<h2>${productList.name}</h2>
					<p>${productList.price} €</p>
					<p>Coloris : ${keyColor}</p>
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
 * send form and recup n° order POST
 * Button Command
 * userFormSubmit = class="order"
 */
userFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    //if input form is true send POST id localstorage
    if (userInputVerification() && totalCartPrice !== 0) {
        const products = idSendConfirm();
        console.log(products);
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
                //redirection confirm.html with N° order
                document.location.href = `./confirmation.html?id=${value.orderId}`;
            })
            .catch((error) => {
                alert('Merci de recharger la page : ' + error);
            });
    } 
});
