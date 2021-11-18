import {Kanap} from "./Modelkanap.js";
let urlApiAllkanaps = "http://localhost:3000/api/products";
const items = document.querySelector("#items");

/**
 * fetch API display all articles
 */

 async function getJsonFromApi(url) {
     return await fetch(url)
    .then(data => data.json())
    .catch((error)=>{
               alert("Merci de recharger la page, une erreur est survenue !");
    });  
 };

function AddHtmlToElement(element, html) {
    element.innerHTML += html;
};

async function displayAllKanaps() {
    let jsonKanaps = await getJsonFromApi(urlApiAllkanaps);
    let modelKanaps = jsonKanaps.map((jsonKanap) => new Kanap(jsonKanap));
    modelKanaps.forEach((modelKanap) => {
        AddHtmlToElement(items, modelKanap.getHtmlRepresentationDisplay);
    });
}
displayAllKanaps();







