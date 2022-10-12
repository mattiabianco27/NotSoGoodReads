const form = document.querySelector('#searchBar');
const bookQuery = document.querySelector('#bookQuery');
const display = document.querySelector('#bookDisplay');

const holder = {
    text: [
        "What are you waiting for?",
        "Search by title",
    ],
    tIndex: 0,
    cIndex: 0
};

form.addEventListener('submit', e => {
    e.preventDefault();
    getBook(e.target.bookTitle.value);
    e.target.reset();
});

select.addEventListener('click', e => {
    if (e.target.classList.contains('selectBook')) {
        addBook(e.target.parentElement.parentElement);
    }
});

const interval = setInterval(async () => {
    bookQuery.placeholder = holder.text[holder.tIndex].slice(0,holder.cIndex+1);

    holder.cIndex++;

    if (holder.tIndex === holder.text.length-1 && holder.cIndex === holder.text[holder.tIndex].length)
        clearInterval(interval);
    
    if (holder.cIndex === holder.text[holder.tIndex].length) {    
        await sleep(1000);
        holder.tIndex = (holder.tIndex + 1)%holder.text.length;
        holder.cIndex = 0;
    }
}, 50);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move(direction=1) {
    const bookContainer = document.querySelector("#bookSlider");
    const books = document.getElementsByClassName("bookContainer");
    const distance = books[1].getBoundingClientRect().left - books[0].getBoundingClientRect().left;

    index += direction;
    if (index < 0) {
        index = books.length - 1;
    } else if (index > books.length - 1) {
        index = 0;
    }

    bookContainer.style.transform = `translate(${-index * distance}px)`;
}