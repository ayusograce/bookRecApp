// GET A RANDOM QUOTE FROM DE QUOTES DATA IN THE JSON FILE.

export async function getQuotesData(dataUrl, containerSelector = ".quote") {
    const quotesCard = document.querySelector(containerSelector);
  
    if (!quotesCard) return;
  
    try {
      const response = await fetch(dataUrl);
      if (response.ok) {
        const data = await response.json();
        createQuotesCards(data, quotesCard);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
}
  
function createQuotesCards(datos, container) {
    container.innerHTML = "";
  
    const citas = datos.quotes || [];
    const randomQuote = getRandom(citas)[0];
  
    const card = document.createElement("div");
    const actualQuote = document.createElement("p");
    const authorBook = document.createElement("p");
  
    actualQuote.textContent = randomQuote.quote;
    authorBook.classList.add('author');
    authorBook.textContent = `-${randomQuote.author} (${randomQuote.book})`;
  
    card.append(actualQuote, authorBook);
    container.appendChild(card);
}
  
function getRandom(array) {
    return array.sort(() => 0.5 - Math.random()).slice(0, 1);
}