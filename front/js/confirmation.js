/**
 * var url = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/search?q=123');
   var queryString = url.search; // Retourne:"?q=123"
 */
// Getting the order Id with the URL
function idRecuperation() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    //?id existe return id : error
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        return id;
    } else {
        alert('Error, no order Id found');
    }
}
//display (await load and display n°order)
window.addEventListener('load', () => {
    const orderId = document.getElementById('orderId');
    orderId.innerText = idRecuperation();
});
