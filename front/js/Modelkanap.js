export class Kanap {
    constructor(jsonArticle){
        this._id = jsonArticle._id;
        this.colors = jsonArticle.colors;
        this.imageUrl = jsonArticle.imageUrl;
        this.altTxt = jsonArticle.altTxt;
        this.name = jsonArticle.name;
        this.description = jsonArticle.description;
        this.price = jsonArticle.price;
    }
    get getHtmlRepresentationDisplay() {
        return this.getHtmlRepresentation();
    }
    getHtmlRepresentation() {
                return  `   <a href="/front/html/product.html?id=${this._id}">
                                <article>
                                <img src="${this.imageUrl}" alt="${this.altTxt}" width="160" height="160">
                                <h3 class="productName">${this.name}</h3>
                                <p class="productDescription">${this.description}</p>
                                </article>
                            </a>
                            `;
    }
  }; 

                          
                           
                    