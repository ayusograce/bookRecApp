import { displayBooks} from "./User.mjs";
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

// Display the list of the favorite books
displayBooks("favorites");


