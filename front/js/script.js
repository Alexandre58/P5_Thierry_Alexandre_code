import {fetchPoduct, displayListKanap} from "../js/function.js";
/**variable index.html
 * 
*/
const images = document.querySelector("#items > a > article > img");
const productName = document.querySelector(".productName");
const productDescription = document.querySelector(".productDescription");

/***
 * CALL API
 */
fetchPoduct();
/**
 * DISPLAY PRODUCT ARTICLES KANAPS
 */

displayListKanap();


  







