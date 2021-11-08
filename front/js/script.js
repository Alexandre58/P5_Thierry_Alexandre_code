import {Kanap} from "./kanap.js";
/**variable index.html
 * 
*/
const images = document.querySelector("#items > a > article > img");
const productName = document.querySelector(".productName");
const productDescription = document.querySelector(".productDescription");

fetch("http://localhost:3000/api/products")
      .then(data => data.json())
      .then(jsonListArticle => {
          for(let jsonArticle of jsonListArticle){
                   let kanap = new Kanap(jsonArticle);
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

      });



