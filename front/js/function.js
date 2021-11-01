export let productsList =[];
export async function fetchPoduct(){
    await fetch("http://localhost:3000/api/products")
       .then((res)=>res.json())
       .then((data)=> {
          productsList = data;
       console.log(productsListe);
       })
       .catch((error)=>{
           alert("Merci de recharger la page, une erreur est survenue !");
       })
   };