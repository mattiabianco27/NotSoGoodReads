const select = document.querySelector('#bookSlider');
const popupNotification = document.querySelector('#notificationContainer');
let index = 0;
let timer;

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

function addBook(bookContainer) {
    const title = bookContainer.querySelector('.bookInfo').querySelector('p').innerText;
    popupNotification.querySelector('#notification').innerHTML = `<p>Il libro "${title}" è stato correttamente aggiunto alla tua raccolta</p>`;
    popupNotification.style.display = 'block';
    
    clearTimeout(timer);
    timer = setTimeout(removePopup, 3000);
}

function removePopup() {
    popupNotification.style.display = 'none';
}

function displayResults(bookData) {
    select.innerHTML = "";
    for (key in bookData.items) {
        const bookInfo = bookData.items[key].volumeInfo;
        const newDiv = document.createElement('div');

        newDiv.classList.add('bookContainer');
        newDiv.innerHTML = `
            <div class="upperBookContainer">
                <img src="${bookInfo.imageLinks.thumbnail}">
                <button type="button" class="selectBook">+</button>
            </div>
            <div class="bookInfo">
                <h3>Title</h3>
                <p>${bookInfo.title}</p>
                <h3>Authors</h3>
                <p>${bookInfo.authors.join(', ')}</p>
            </div>
        `;

        select.appendChild(newDiv);
    }
}