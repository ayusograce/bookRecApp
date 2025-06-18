import { getBookDetails } from "./Books.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear,} from "./utils.mjs";
import {getQuotesData} from "./quotes.mjs";
import { saveBook } from "./User.mjs";

// Load header and footer
loadHeaderFooter().then(() => {
    //The button and navigation
    setupNavigation();
    // Insert year in the footer
    insertCurrentYear();
});

// Animation to sections
observeHiddenElements();

// Get a random quote from the JSON data
getQuotesData("../public/json/quotes.json");

// Get the details and info of the book
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');
let bookInfo = {};
getBookDetails({id:bookId, containerId:"book-details"}).then((info) =>{
    bookInfo = info;
});

// To the save to favorites button, and save the book in the list
document.getElementById("save-fav").addEventListener("click", () =>{
    if(!bookInfo){
        alert("Book info not loaded yet");
        return;
    }
    saveBook({id:bookId, title: bookInfo.title, cover: bookInfo.imageLinks?.thumbnail || "placeholder.jpg"});
})








