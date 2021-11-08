import {Kanap} from "./kanap.js";


 const getJsonFromApi = async ()=>{
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


 }
 getJsonFromApi();



