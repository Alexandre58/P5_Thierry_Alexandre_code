const sectionItems = document.querySelector("#items");
const images = document.querySelector("#items > a > article > img");
const productName = document.querySelector(".productName");
const productDescription = document.querySelector(".productDescription");


/**
 * Api 
 */
//list product in tab productsListe
let productsListe =[];

const fetchPoduct =  async () => {
 await fetch("http://localhost:3000/api/products")
    .then((res)=>res.json())
    .then((data)=> {
       productsListe = data;
    console.log(productsListe);
    });
};

//affichage des elements
const productDisplay = async () => {
    await fetchPoduct();
    sectionItems.innerHTML = productsListe.map((list)=>  
              `  
                 <a href="#">
                    <article>
                         <img src="${"/back/images/kanap01.jpeg"}" alt="Lorem ipsum dolor sit amet, Kanap name1" width="160" height="160">

                        <h3 class="productName">${list.name}</h3>
                        <p class="productDescription">${list.description}</p>
                    </article>
                </a>
              `
    );
};
productDisplay();   
/* <img src="${list.imageUrl}" alt="${list.altTxt}">ligne a remettre dans les articles*/