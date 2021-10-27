const idSectionContainercartHtml = document.getElementById("cart__items");



//recupération api de la page affichée
const recupInfoIdProduct = async (key)=> {
	let keyCorlors = localStorage.key(key);
	                                                      console.log(keyCorlors);
	let idColorArray = keyCorlors.split(",");
	                                                      console.log(idColorArray);
	let itemId = idColorArray[0];
	                                                      console.log(itemId);
	try {
		let response = await fetch(`http://localhost:3000/api/products/${itemId}`);
		                                                  console.log(response);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}

(async ()=> {
	//rajout a la suite de plusieurs commandes dans le panier
	for (let key = 0; key < localStorage.length; key++) {
		let item = await recupInfoIdProduct(key);
		idSectionContainercartHtml.innerHTML +=  `
		<article class="cart__item" data-id="${item._id}" data-color="${localStorage.key(key).split(",")[1]}" data-price="${item.price}">
			<div class="cart__item__img">
				<img src="${item.imageUrl}" alt="${item.altTxt}">
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__titlePrice">
					<h2>${item.name}</h2>
					<p>${item.price} €</p>
					<p>Coloris : ${localStorage.key(key).split(",")[1]}</p>
				</div>
				<div class="cart__item__content__settings">
					<div class="cart__item__content__settings__quantity">
						<p>Qté : </p>
						<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.getItem(localStorage.key(key))}">
					</div>
					<div class="cart__item__content__settings__delete">
						<p class="deleteItem">Supprimer</p>
					</div>
				</div>
			</div>
		</article>
		`;
	}
})();



