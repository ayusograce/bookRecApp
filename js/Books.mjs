
export async function bookCards({query, IdContainer, maxResults = 8}){
    const resultsDiv = document.getElementById(IdContainer);
    resultsDiv.innerHTML = 'Searching books...';

    try {
        const apiKey = 'AIzaSyAZdb28IHLfE2YtRQFLGP8LTK4ivpDfMTY';
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&langRestrict=en&key=${apiKey}`);
        const data = await res.json();

        if (!data.items) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
        }

        resultsDiv.innerHTML = data.items.map(book => {
        const info = book.volumeInfo;
        return `
            <div class="card">
            <a href="/bookRecApp/book_genres/book.html?id=${book.id}">
                <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200?text=No+cover'}" alt="Cover of ${info.title}">
                <h3>${info.title}</h3>
            </a>
            <p><strong>Autor:</strong> ${info.authors ? info.authors.join(', ') : 'Unknown'}</p>
            </div>
        `;
        }).join('');
    } catch (error) {
        resultsDiv.innerHTML = '<p>Oh no! There was an error in the search.</p>';
        console.error(error);
    }
}


export async function getBookDetails({id, containerId}) {
    const container = document.getElementById(containerId);
    const apiKey = 'AIzaSyAZdb28IHLfE2YtRQFLGP8LTK4ivpDfMTY';
    if (!id){
        container.innerHTML = "<p>No book ID was provided.<p>";
        return;
    }
    try{
        const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`; 
        const res = await fetch(url);
        const data =await res.json();
        const info = data.volumeInfo;
        container.innerHTML = `
            <h2>${info.title}</h2>
            <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200?text=No+cover'}" alt="Cover of ${info.title}">
            <p><strong>Author:</strong> ${info.authors ? info.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Publisher:</strong> ${info.publisher || 'N/A'}</p>
            <p><strong>Published Date:</strong> ${info.publishedDate || 'N/A'}</p>
            <p><strong>Description:</strong> ${info.description || 'No description available.'}</p>
            <a href="${info.previewLink}" target="_blank">Preview on Google Books</a>
            `;

            const rawGenre = info.categories?info.categories[0]:"fiction";
            const cleanGenre = rawGenre.toLowerCase().split("/")[0].trim().replace(/\s+/g, "_");
            getRecommendations({genre:cleanGenre, containerId:"recommended-books"});
        } catch (error){
        container.innerHTML = "<p>Error loading the page.</p>";
        console.error(error);
    }
}

export async function getRecommendations({genre, containerId}) {
    const container = document.getElementById(containerId);
    try{
        const url = `https://openlibrary.org/subjects/${encodeURIComponent(genre)}.json?limit=10`;
        const res = await fetch(url);
        const data = await res.json();
        if(!data.works || data.works.length === 0){
            container.innerHTML = `<p>No related books found for genre: ${genre}.</p>`;
            return  
        }
        container.innerHTML =
        data.works.map(work => {
            const coverId = work.cover_id;
            const coverImg = coverId? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`: 'https://via.placeholder.com/128x200?text=No+cover';
            return `<div class="card">
                <img src="${coverImg}" alt="Cover of ${work.title}">
                <h4>${work.title}</h4>
                <p><strong>Author:</strong> ${work.authors && work.authors[0] ? work.authors[0].name : 'Unknown'}</p>
            </div>`;
        }).join("");
    } catch (error){
        container.innerHTML = `<p>Error loading related books.</p>`;
        console.error(error);
    }
}
