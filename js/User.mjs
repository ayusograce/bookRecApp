// Save user information in the local storage
export function loginUser(name, email){
    const user = {
        name: name,
        email: email,
        favorites: []
    };
    localStorage.setItem("currentuser", JSON.stringify(user));
    console.log(name +" logged in");
}

// Retrives user data
export function getCurrentUser(){
    const user = JSON.parse(localStorage.getItem("currentuser"));
    return user || null;
}

// Log out
export function logout(){
    localStorage.removeItem("currentuser");
    console.log("User logged out");
}

// Save a book in favorites
export function saveBook(book){
    const user = getCurrentUser();
    if (!user){
        alert("Please log in to save the book");
        return
    }
    const exists = user.favorites.some(fav => fav.id === book.id);
    if(exists){
        alert("This book is already in your list");
        return
    }
    user.favorites.push(book);
    localStorage.setItem("currentuser", JSON.stringify(user));
    alert(book.title + "added to your favorites!");
}

// Retrieve current user favorites
export function getBooks(){
    const user = getCurrentUser();
    return user ? user.favorites: [];
}

// Load favorite books in cards
export function displayBooks(containerId){
    const container = document.getElementById(containerId);
    const favorites = getBooks();
    if(!favorites.length){
        container.innerHTML = "<p>You don't any favorites yet</p>";
        return
    }
    container.innerHTML = favorites.map(book => `<div class="card favorites">
        <img src="${book.cover}" alt="Cover of ${book.title}">
        <h3>${book.title}</h3>
        <a href="/book_genres/book.html?id=${book.id}">View Details</a>
        </div>`).join('');
}