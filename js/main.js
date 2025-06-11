import { bookCards } from "./BookCards.mjs";
import {loadHeaderFooter, observeHiddenElements, setupNavigation, insertCurrentYear,} from "./utils.mjs";

observeHiddenElements();

setupNavigation();

insertCurrentYear();

loadHeaderFooter();

bookCards();