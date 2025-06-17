
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

// Last modified date
export function insertLastModified(selector = "#lastModified") {
    const date = document.querySelector(selector);
    const lastModified = document.lastModified;
    if (date) {
      date.textContent = `Last modification: ${lastModified}`;
    }
}

export function renderWithTemplate(templateFn, parentElement, callback, data) {
  parentElement.innerHTML = templateFn;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}


export async function loadHeaderFooter(path = "../"){
  const path = path;
  const headerTemplate = await loadTemplate(`${path}public/partials/header.html`);
  const footerTemplate = await loadTemplate(`${path}public/partials/footer.html`);
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);
  }