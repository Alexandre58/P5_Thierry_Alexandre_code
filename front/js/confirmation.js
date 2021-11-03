/**
 * var url = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/search?q=123');
   var queryString = url.search; // Retourne:"?q=123"
 */
// Getting the order Id with the URL
function idRecuperation() {
	let url = new URL(window.location.href);
                                                     	console.log(url );
	let searchParams = new URLSearchParams(url.search);
	//Code d'essai a ne pas garder
														console.log(searchParams);
														let toStringLog = searchParams.toString();
														console.log(toStringLog);
    //FIN Code d'essai a ne pas garder
	//?id existe return id : error
	if (searchParams.has("id")) {
		let id = searchParams.get("id");
	                                                 	console.log(id);
		return id;
	} else {
		console.log("Error, no order Id found");
	}
}
//display (await load and display n°order)
window.addEventListener("load", () => {
	const orderId = document.getElementById("orderId");
	orderId.innerText = idRecuperation();
});