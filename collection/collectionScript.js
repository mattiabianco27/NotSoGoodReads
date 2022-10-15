const collectionContainer = document.querySelector('#bookSlider');
const collectionDimension = localStorage.getItem('collectionDimension') ? Number(localStorage.getItem('collectionDimension')) : 0;

function init() {
    for (let i=0; i<collectionDimension; i++) {
        const info = JSON.parse(localStorage.getItem(`book${i}`));

        let node = document.createElement('div');
        node.classList.add('bookContainer');
        node.id = `book${i}`;
        
        node.innerHTML = `
            <div class="upperBookContainer">
                <div class="upLeftBookContainer">
                    <img src="${info.img}">
                </div>
                <div class="upRightBookContainer">
                    <div class="bookInfo">
                        <h5>Title</h5>
                        <p>${info.title}</p>
                        <h5>Authors</h5>
                        <p>${info.authors}</p>
                    </div>
                    <button type="button" class="removeBook">Remove from your collection</button>
                </div>
            </div>
            <div class="lowerBookContainer">
                <div>
                    <h5>Current position</h5>
                    <textarea readonly>${info.progress}</textarea>
                </div>
                <div>
                    <h5>Total pages</h5>
                    <textarea  readonly>${info.numberOfPages}</textarea>
                </div>
                <button type="button" class="enEdit">Enable Editing</button>
                <button type="button" class="updateInfo">Update</button>
            </div>
        `;

        collectionContainer.appendChild(node);
    }
}

init();
collectionContainer.addEventListener('click', e => {
    if (e.target.classList.contains('removeBook')) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        const lastBook = localStorage.getItem(`book${collectionDimension-1}`);

        localStorage.setItem(id, lastBook);
        localStorage.removeItem(`book${collectionDimension-1}`);
        localStorage.setItem('collectionDimension', collectionDimension-1);

        document.querySelector(`#book${collectionDimension-1}`).id = id;

        location.reload();
    } else if (e.target.classList.contains('enEdit')) {
        const textAreas = e.target.parentElement.querySelectorAll('textarea');

        e.target.innerText = textAreas[0].hasAttribute('readonly')? "Disable Editing" : "Enable Editing";
        for (let i=0; i<textAreas.length; i++) {
            if (textAreas[i].hasAttribute('readonly'))
                textAreas[i].removeAttribute('readonly');
            else
                textAreas[i].setAttribute('readonly', 'readonly');
        }
    } else if (e.target.classList.contains('updateInfo')) {
        const id = e.target.parentElement.parentElement.id;
        const textAreas = e.target.parentElement.querySelectorAll('textarea');
        let bookInfo = JSON.parse(localStorage.getItem(id));
        
        if (!isNaN(textAreas[0].value) && !isNaN(textAreas[1].value) && Number(textAreas[0].value) <= Number(textAreas[1].value)) {
            bookInfo.numberOfPages = textAreas[0].value;
            bookInfo.progress = textAreas[1].value;
    
            localStorage.setItem(id, JSON.stringify(bookInfo));
        } else {
            console.log('Unable to update book info');
        }
    }
});