/**variable index.html
 * 
*/
const images = document.querySelector("#items > a > article > img");
const productName = document.querySelector(".productName");
const productDescription = document.querySelector(".productDescription");


/**
 *tab productsList with call all api
 *  
 */
//list product in tab productsList for all elements 
let productsList =[];
const fetchPoduct =  async () => {
    await fetch("http://localhost:3000/api/products")
       .then((res)=>res.json())
       .then((data)=> {
          productsList = data;
       console.log(productsList);
       })
       .catch((error)=>{
           alert("Merci de recharger la page, une erreur est survenue !");
       })
   };
/**
 * display elements with a function UTIL ON SCRIPT.JS/ACCUEIL
 * 
 */
const displayListKanap = async () =>{
    await fetchPoduct();
    //display articles page accueil
    const sectionItems = document.querySelector("#items").innerHTML = productsList.map((list)=> 
    //href du produit choisis qui renvoi vers la page product.html 
              `  
                 <a href="/front/html/product.html?id=${list._id}">
                    <article>
                        <img src="${list.imageUrl}" alt="${list.altTxt}" width="160" height="160">
                        <h3 class="productName">${list.name}</h3>
                        <p class="productDescription">${list.description}</p>
                    </article>
                </a>
              `

    ).join("");
};
displayListKanap();






