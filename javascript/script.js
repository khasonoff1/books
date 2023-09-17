import { bookmarkFunction } from "./modal.js";
export function findElement(element, parent = document) {
    return parent.querySelector(element);
}
const elCards = findElement(".cards");
const templateBooks = findElement("#template-products");
const elLogoutBtn = findElement(".btn-header");
const BASE_API = "https://www.googleapis.com/books/v1/volumes";

//////////////////// render products

function renderBooks(data, parent) {
    parent.innerHTML = null;
    const fragment = document.createDocumentFragment();
    data.forEach((element) => {
        const newTemplate = templateBooks.content.cloneNode(true);
        const img = findElement(".card-img", newTemplate);
        const title = findElement(".card-title", newTemplate);
        const desc = findElement(".card-desc", newTemplate);
        const read = findElement(".read", newTemplate);
        const more = findElement(".card-footer-btn-1", newTemplate);
        const bookmarkBtn = findElement(".card-footer-btn-1", newTemplate);

        more.dataset.id = element.id;
        bookmarkBtn.dataset.id = element.id;

        img.src = element.volumeInfo.imageLinks.thumbnail;
        title.textContent = element.volumeInfo.title;
        desc.textContent = element.volumeInfo.author;

        if (read) {
            read.href = element.volumeInfo.previewLink;
            read.target = "_blank";
        }

        fragment.appendChild(newTemplate);
    });
    parent.appendChild(fragment);
}
fetch(BASE_API + "?q=python&startIndex=0&maxResult=6")
    .then((res) => res.json())
    .then((res) => {
        renderBooks(res.items, elCards);
        bookmarkFunction(BASE_API, elCards);
    })
    .catch((err) => {
        console.log(err);
    });

//////////////////// logout

elLogoutBtn.addEventListener("click", () => {
    window.location.replace("./pages/login.html");
});

//////////////////// search

const elForm = findElement(".form");
const elSearch = findElement("#searchInput");

function search(url, parent) {
    elForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        fetch(`${url}?q=${elSearch.value}&startIndex=0&maxResults=6`)
            .then((res) => res.json())
            .then((res) => {
                renderBooks(res.items, parent);
            });
    });
}
search(BASE_API, elCards);