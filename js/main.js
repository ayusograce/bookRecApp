import { bookCards, blindDateBook } from "./Books.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear, } from "./utils.mjs";
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

// For the book search section of the page
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    bookCards({query: query, IdContainer: "results", maxResults: 8});
});

// Get a random quote from the JSON data
getQuotesData("../public/json/quotes.json");

// Blind date book section. It selects a random book for the user
blindDateBook("blind-date", "blind-date-result");


