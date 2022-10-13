const select = document.querySelector('#bookSlider');
const popupNotification = document.querySelector('#notificationContainer');
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
            <div class="leftBookContainer">
            <img src="${bookInfo.imageLinks.thumbnail}">
            </div>
            <div class="rightBookContainer">
                <div class="bookInfo">
                    <h5>Title</h5>
                    <p>${bookInfo.title}</p>
                    <h5>Authors</h5>
                    <p>${bookInfo.authors.join(', ')}</p>
                </div>
                <button type="button" class="selectBook">Add to your collection</button>
            </div>
        `;

        select.appendChild(newDiv);
    }
}