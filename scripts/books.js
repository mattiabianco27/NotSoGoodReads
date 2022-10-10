async function getBook(bookTitle) {
    const data = await requestBook(bookTitle);
    displayResults(data);
}

async function requestBook(bookTitle) {
    const URI = 'https://www.googleapis.com/books/v1/volumes?q=';
    const query = URI + bookTitle;

    const response = await fetch(query);
    const data = await response.json();

    return data;
}

function displayResults(bookData) {
    console.log(bookData);
}