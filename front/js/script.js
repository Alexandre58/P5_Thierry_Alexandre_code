import {Kanap} from "./Modelkanap.js";
let urlApiAllkanaps = "http://localhost:3000/api/products";
const items = document.querySelector("#items");

/**
 * fetch API display all articles
 */
const displayAllKanaps = async ()=> {
    await fetch(urlApiAllkanaps)
    .then(data => data.json())
    .then(jsonListArticle => {   
        for(let productList of jsonListArticle){
                 let kanap = new Kanap(productList);
                        items.innerHTML += `<a href="/front/html/product.html?id=${kanap._id}">
                                                <article>
                                                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}" width="160" height="160">
                                                    <h3 class="productName">${kanap.name}</h3>
                                                    <p class="productDescription">${kanap.description}</p>
                                                </article>
                                            </a>
                                           `    
        };
    })
    .catch((error)=>{
               alert("Merci de recherger la page, une erreur est survenue !");
    })

 };
 displayAllKanaps();

        
//kanap.array.forEach(let productList of jsonListArticle





/**
 * fetch API display all articles
 */
/*
 async function getJsonFromApi(url) {
    await fetch(url)
    .then(data => data.json())
    .catch((error)=>{
               alert("Merci de recherger la page, une erreur est survenue !");
    });
    
 };

function AddHtmlToElement(element, html) {
    element.innerHTML += html;
};


async function displayAllKanaps() {
    let jsonKanaps = await getJsonFromApi(urlApiAllkanaps);
    let modelKanaps = jsonKanaps.map((jsonKanap) => new Kanap(jsonKanap));
    modelKanaps.array.foreach((modelKanap) => {
        AddHtmlToElement(items, modelKanap.getHtmlRepresentationDisplay);
    });
}
displayAllKanaps();
*/






/*
function DisplayAllKanaps2() {
    getJsonFromApi(urlAllKanaps)
    .then((jsonKanaps) => jsonKanaps.map((jsonKanap) => new Kanap(jsonKanap)))
    .then((modelKanaps) => modelKanaps.foreach((modelKanap) => AddHtmlToElement(items, modelKanap.getHtmlRepresentation())))
    .catch((errrt) => {

    })
}
*/
/*

function _CreateModelKanapsFromJson(jsonKanaps) {
    return jsonKanaps.map((jsonKanap) => new Kanap(jsonKanap));
}

function _AddListKanapsToHtml(modelKanaps) {
    return  modelKanaps.foreach((modelKanap) => AddHtmlToElement(items, modelKanap.getHtmlRepresentation()));
}

function DisplayAllKanaps3() {
    getJsonFromApi(urlAllKanaps)
    .then((jsonKanaps) => _CreateModelKanapsFromJson(jsonKanaps))
    .then((modelKanaps) => _AddListKanapsToHtml(modelKanaps))
    .catch((error) => {

    })
}
*/
