let urlApiAllkanaps = "http://localhost:3000/api/products";



async function getJsonFromApi(url) {
    await fetch(url)
    .then(data => data.json())
    .catch((error)=>{
               alert("Merci de recherger la page, une erreur est survenue !");
    });
    
 };