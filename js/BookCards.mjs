export function bookCards(){
    document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching books...';

    try {
        const apiKey = 'AIzaSyAZdb28IHLfE2YtRQFLGP8LTK4ivpDfMTY';
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8&key=${apiKey}`);
        const data = await res.json();

        if (!data.items) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
        }

        resultsDiv.innerHTML = data.items.map(book => {
        const info = book.volumeInfo;
        return `
            <div class="card">
            <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200?text=No+cover'}" alt="Cover of ${info.title}">
            <h3>${info.title}</h3>
            <p><strong>Autor:</strong> ${info.authors ? info.authors.join(', ') : 'Unknown'}</p>
            </div>
        `;
        }).join('');
    } catch (error) {
        resultsDiv.innerHTML = '<p>Oh no! There was an error in the search.</p>';
        console.error(error);
    }
    });
}