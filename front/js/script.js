import {Kanap} from "./kanap.js";

//const urlApiAllkanaps ="http://localhost:3000/api/products";
//console.log(urlApiAllkanaps);
//const idItems = document.querySelector("#items");


 (async ()=>{
    await fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then(jsonListArticle => {
        for(let productList of jsonListArticle){
                 let kanap = new Kanap(productList);
                          document.querySelector("#items").innerHTML +=
                          `  
                          <a href="/front/html/product.html?id=${kanap._id}">
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
    });

 })();
 
 

/*
function getJsonFromApi (url) {
      async () => {
    await fetch(url)
        .then((res)=>res.json())
        .then((data)=> {
                              console.log(data);
            return data;
        })
        .catch((error)=>{
            alert("Merci de recharger la page, une erreur est survenue !");
        })
    };
}

function insertHtmlIntoPage(htmlToBeInserted, idParent) {
    document.getElementById(idParent).innerHTML = htmlToBeInserted;
}
console.log(insertHtmlIntoPage);


function DisplayAllKanaps() {
   
    getJsonFromApi(urlApiAllkanaps)
    .then(data => data.json())
        .then((jsonKanaps) => {
           let  htmlKanaps = '';
            console.log(jsonKanaps);

            jsonKanaps.forEach(jsonKanap => {
                let kanap = new Kanap(jsonKanap);
                console.log(kanap);
                console.log(Kanap);
                htmlKanaps += kanap.getHtmlRepresentation();
            });
            insertHtmlIntoPage(htmlKanaps, idItems);
        });
}
DisplayAllKanaps();
*/