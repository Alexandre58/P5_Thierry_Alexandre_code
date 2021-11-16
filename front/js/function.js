/**
 *Vérification d'url de la page actuel
 * @returns string
 */
export const verifIsAGoodUrl = () => {
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
 * if localStorage empty ,return accueil
 */
const idSectionContainercartHtml = document.querySelector('#cart__items');
export function checkIfCartEmpty() {
    if (localStorage.length == 0) {
        idSectionContainercartHtml.innerHTML =
            "<p >Il n'y a pas encore de Kanap ici, visitez <a href='./index.html' style=' color:white; font-weight:700'>notre séléction 🛋️</a>.</p>";
    }
}

/*******CODE reup id for confirm command   */
export function idSendConfirm() {
    //tab information id recup localstorage
    let idRecupLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
        let idColor = localStorage.key(i);
        //divise list in tab
        let idColorArray = idColor.split(',');
        let id = idColorArray[0];
        idRecupLocalStorage.push(id);
    }
    return idRecupLocalStorage;
}
/*
 * return key without color
 * @param {*} key
 * @returns {object}
 */
export const recupInfoIdProduct = async (key) => {
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
