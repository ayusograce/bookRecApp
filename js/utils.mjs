import { logout } from "./User.mjs";

// This function erase the user info of the localStorage
export async function logoutButton(){
  document.getElementById("logout-btn").addEventListener("click", () => {
  logout();
  window.location.href = "/";
})};

// Function to add the show class to the sections and animate them
export function observeHiddenElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}

//The button and navigation
export function setupNavigation(menuSelector = '#menu', navSelector = 'nav') {
	const hamButton = document.querySelector(menuSelector);
	const navigation = document.querySelector(navSelector);
  
	if (!hamButton || !navigation) return;
  
	hamButton.addEventListener('click', () => {
	  navigation.classList.toggle('open');
	  hamButton.classList.toggle('open');
	});
}

// Current year
export function insertCurrentYear(selector = "#currentyear") {
    const currentyear = document.querySelector(selector);
    const today = new Date();
    if (currentyear) {
      currentyear.innerHTML = `&#169;<span class="highlight">${today.getFullYear()}</span>` + currentyear.textContent;
    }
}

// Function to render an element with a template
export function renderWithTemplate(templateFn, parentElement, callback, data) {
  parentElement.innerHTML = templateFn;
  if(callback) {
    callback(data);
  }
}

// Function to load the template
export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Function to load dynamically the header and the footer
export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);
  }