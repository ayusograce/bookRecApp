import { bookCards } from "./Books.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear,} from "./utils.mjs";
import {getQuotesData} from "./quotes.mjs";

observeHiddenElements();

setupNavigation();

const genreOptions = document.querySelectorAll(".genre-type");
genreOptions.forEach(button => {
    button.addEventListener("click", () => {
        const genre = button.dataset.genre;
        bookCards({query:`subject:${genre}`, IdContainer:"genre-results", maxResults:20});
    });
});

document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    bookCards({query: query, IdContainer: "results", maxResults: 8});
});

getQuotesData("../public/json/quotes.json");

insertCurrentYear();

loadHeaderFooter();


