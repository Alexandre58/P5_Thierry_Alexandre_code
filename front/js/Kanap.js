class Kanap {
        constructeur(productsListe){
        //    jsonArticle && Object.assign(this, jsonArticle);
        
        this.id = productsListe._id;
        this.name =productsListe.name;
        this.price = productsListe.price;
        this.image = productsListe.imageUrl;
        this.description = productsListe.description;
        this.alt = productsListe.altTxt;
        this.colors = productsListe.colors;
    }
  }
 
