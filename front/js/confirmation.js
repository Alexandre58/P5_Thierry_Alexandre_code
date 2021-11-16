import { verifIsAGoodUrl } from './function.js';

//display (await load and display n°order)
window.addEventListener('load', () => {
    const orderId = document.getElementById('orderId');
    orderId.innerText = verifIsAGoodUrl();
});
