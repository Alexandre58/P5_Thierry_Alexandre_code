
fetch("http://localhost:3000/api/products")
       .then(data =>data.json())
       .then (productsList => {
          //display console data list 
          console.log(productsListe);
          for(let jsonArticle of productsListe){
              let KanapList = new Kanap(jsonArticle);
              
              console.log(KanapList);
              console.log(productsListe);
             
             /*    document.querySelector("#items").innerHTML +=
                
                            `  
                               <a href="/front/html/product.html?id=${KanapList._id}">
                                  <article>
                                      <img src="${KanapList.imageUrl}" alt="${KanapList.altTxt}" width="160" height="160">
                                      <h3 class="productName">${KanapList.name}</h3>
                                      <p class="productDescription">${KanapList.description}</p>
                                  </article>
                              </a>
                            `;*/

          }
       })
       .catch((error)=>{
           alert("Merci de recharger la page, une erreur est survenue !");
       });