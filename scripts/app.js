const form = document.querySelector('#searchBar');
const select = document.querySelector('#bookSelector');
const display = document.querySelector('#bookDisplay');

form.addEventListener('submit', e => {
    e.preventDefault();
    getBook(e.target.bookTitle.value);
});

select.addEventListener('click', e => {
    if (e.target.classList.contains('saveBook')) {
        console.log('Trying to add some new book to your collection... Will be available soon');
    }
});