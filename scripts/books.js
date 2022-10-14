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
    const info = bookContainer.querySelector('.bookInfo').querySelectorAll('p');
    const title = info[0].innerText;
    const authors = info[1].innerText;
    const img = bookContainer.querySelector('.leftBookContainer').querySelector('img').src;

    const collectionDimension = localStorage.getItem('collectionDimension') ? Number(localStorage.getItem('collectionDimension')) : 0;

    localStorage.setItem(`book${collectionDimension}`, JSON.stringify({title: title, authors: authors, img: img, numberOfPages: 0, progress: 0}));
    localStorage.setItem('collectionDimension', collectionDimension+1);

    popupNotification.querySelector('#notification').innerHTML = `<p>Book "${title}" has been successfully added to your collection</p>`;
    popupNotification.style.display = 'block';
    clearTimeout(timer);
    timer = setTimeout(removePopup, 5000);
}

function removePopup() {
    popupNotification.style.display = 'none';
}

function displayResults(bookData) {
    select.style.transform = `translate(0px)`;
    carouselBookIndex = 0;
    
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
