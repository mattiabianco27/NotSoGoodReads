const select = document.querySelector('#bookSelector');
const popupNotification = document.querySelector('#notificationContainer');

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

function addBook(bookElement) {
    const title = bookElement.previousElementSibling.childNodes[1].innerText;
    popupNotification.querySelector('#notification').innerHTML = `<p>Il libro "${title}" è stato correttamente aggiunto alla tua raccolta</p>`;
    popupNotification.style.display = 'block';
    setTimeout(removePopup, 3000);
}

function removePopup() {
    popupNotification.style.display = 'none';
}

function displayResults(bookData) {
    select.innerHTML = "";
    for (key in bookData.items) {
        const bookInfo = bookData.items[key].volumeInfo;
        const newDiv = document.createElement('div');

        newDiv.classList.add('book');
        newDiv.innerHTML = `
            <img src="${bookInfo.imageLinks.thumbnail}">
            <div class="bookInfo">
                <p>${bookInfo.title}</p>
                <p>${bookInfo.authors}</p>
            </div>
            <button type="button" class="selectBook">+</button>
        `;

        select.appendChild(newDiv);
    }
}