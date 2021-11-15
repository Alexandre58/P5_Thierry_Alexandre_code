export class Kanap {
    constructor(jsonArticle){
        this._id = jsonArticle._id;
        this.colors = jsonArticle.colors;
        this.imageUrl = jsonArticle.imageUrl;
        this.altTxt = jsonArticle.altTxt;
        this.name = jsonArticle.name;
        this.description = jsonArticle.description;
    }
    get getHtmlRepresentationDisplay() {
        return this.getHtmlRepresentation()
    }
    getHtmlRepresentation() {
        return       
        `   <a href="/front/html/product.html?id=${this._id}">
                <article>
                    <img src="${this.imageUrl}" alt="${this.altTxt}" width="160" height="160">
                    <h3 class="productName">${this.name}</h3>
                    <p class="productDescription">${this.description}</p>
                </article>
            </a>
      `;
    }
  }; 
  
       







/*export class Kanap {
    constructor(productList){
        productList && Object.assign(this,productList);
    }*/
 /*
get id () {

}

set id() {

}

set prix (newPrix) {
    if (newPrix > 0)
    this.prix = newPrix;
}
*//*
    //kanap.getHtmlRepresentation()
getHtmlRepresentation() {
        return       
        `   <a href="/front/html/product.html?id=${this._id}">
                <article>
                    <img src="${this.imageUrl}" alt="${this.altTxt}" width="160" height="160">
                    <h3 class="productName">${this.name}</h3>
                    <p class="productDescription">${this.description}</p>
                </article>
            </a>
      `;
      
}

//kanap.htmlRepresentation

get htmlRepresentation() {
    return getHtmlRepresentation();
}

}

*/



//assign l'objet productList dans l'objet this sans écraser celles qui éxistes déjà 
//this represente une instance de la classe Article

/*La méthode Object.assign() est utilisée afin de copier les valeurs de toutes les propriétés directes (non héritées) d'un objet qui sont énumérables sur un autre objet cible. Cette méthode renvoie l'objet cible.
*/


/*Equivaut a faire 
                            class Kanap {
                                constructor(jsonArticle){
                                    this.id = jsonArticle.id;
                                    this.name = jsonArticle.name;
                                    this.description = jsonArticle.description;
                                    this.colors = jsonArticle.colors;
                                    this.altText = jsonArticle.altText;
                                 
                                    
                                }
}*/
/**
 *       `   <a href="/front/html/product.html?id=${kanap._id}">
                                <article>
                                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}" width="160" height="160">
                                    <h3 class="productName">${kanap.name}</h3>
                                    <p class="productDescription">${kanap.description}</p>
                                </article>
                              </a>
                          `
 */
                                     
                           
                    