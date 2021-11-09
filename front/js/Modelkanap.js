export class Kanap {
    constructor(productList){
        productList && Object.assign(this,productList);
        
    }
}
//assign l'objet productList dans l'objet this sans écraser celles qui éxistes déjà 
//this represente une instance de la classe Article

/*La méthode Object.assign() est utilisée afin de copier les valeurs de toutes les propriétés directes (non héritées) d'un objet qui sont énumérables sur un autre objet cible. Cette méthode renvoie l'objet cible.
*/


/*Equivaut a faire 
                            class Kanap {
                                constructor(productList){
                                    this.id = productList.id;
                                    this.id = productList.name;
                                    this.id = productList.description;
                                    ect...
                                    
                                }
}*/