//////////////////// more modal
function findElement(element, parent = document) {
    return parent.querySelector(element);
}
const modalDesc = findElement("#modal-desc");
const modalImg = findElement(".m-auto");
const modalTitle = findElement(".modal-title");
const modalAuthor = findElement("#author");
const modalPublished = findElement("#published");
const modalPublisher = findElement("#publishers");
const modalCategories = findElement("#categories");
const modalPage = findElement("#pages");
console.log(modalPage);

export function bookmarkFunction(url, parent) {
    parent.addEventListener("click", (evt) => {
        console.log(evt);
        if (evt.target.className.includes("card-footer-btn-2")) {
            fetch(`${url}?q=python&startIndex=0&maxResults=6`)
                .then((res) => res.json())
                .then((res) => {
                    const id = evt.target.dataset.id;
                    res.items.forEach((element) => {
                        if (id == element.id) {
                            modalImg.src = element.volumeInfo.imageLinks.thumbnail;
                            modalTitle.textContent = element.volumeInfo.title;
                            modalAuthor.textContent = element.volumeInfo.authors[0];
                            modalPublished.textContent = element.volumeInfo.publishedDate;
                            modalDesc.textContent = element.volumeInfo.description;
                            modalPublisher.textContent = element.volumeInfo.publisher;
                            modalCategories.textContent = element.volumeInfo.categories;
                            modalPage.textContent = element.volumeInfo.pageCount;
                        }
                    });
                });
        }
    });
}
