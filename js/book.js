import { getBookDetails } from "./Books.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear,} from "./utils.mjs";
import {getQuotesData} from "./quotes.mjs";

observeHiddenElements();

setupNavigation();

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');
getBookDetails({id:bookId, containerId:"book-details"});

getQuotesData("../public/json/quotes.json");

insertCurrentYear();

loadHeaderFooter();


