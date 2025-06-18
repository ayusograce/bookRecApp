import { loginUser } from "./User.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear, logoutButton} from "./utils.mjs";
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

// This is for erase the information of the user
logoutButton();

// To save the user information in the localStorage
document.getElementById("login-form").addEventListener("submit", (e =>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    loginUser(name, email);
    alert("Welcome " + name + "!");
    window.location.href = "/";
}))



