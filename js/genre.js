import { bookCards } from "./Books.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear} from "./utils.mjs";
import {getQuotesData} from "./quotes.mjs";

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

// This is for the search by genre of the books
const genreOptions = document.querySelectorAll(".genre-type");
genreOptions.forEach(button => {
    button.addEventListener("click", () => {
        const genre = button.dataset.genre;
        bookCards({query:`subject:${genre}`, IdContainer:"genre-results", maxResults:20});
    });
});

// For the book search section of the page
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    bookCards({query: query, IdContainer: "results", maxResults: 8});
});


