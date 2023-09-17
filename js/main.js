import { BASE_API } from "./utils.js";
function findElement(element, parent = document) {
    return parent.querySelector(element);
}

const elCards = findElement(".cards");
const templateBooks = findElement("#template-products");

function renderBooks(parent, array) {
    parent.innerHTML = null;
    const fragment = document.createDocumentFragment();
    array.forEach((element) => {
        const newTemplate = templateBooks.content.cloneNode(true);
        const img = findElement(".card-img", newTemplate);
        const title = findElement(".card-title", newTemplate);
        const desc = findElement(".card-desc", newTemplate);

        img.src = element.volumeInfo.imageLinks.thumbnail;
        title.textContent = element.volumeInfo.title;
        desc.textContent = element.volumeInfo.author;

        fragment.appendChild(newTemplate);
    });
    parent.appendChild(fragment);
}
// fetch(BASE_API + "?q=python&startIndex=0&maxResult=6")
//     .then((res) => res.json())
//     .then((res) => {
//         renderBooks(res.items, elCards);
//         console.log(res.items);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const elLogoutBtn = document.querySelector(".btn-header");
elLogoutBtn.addEventListener("click", (evt) => {
    window.location.replace("./login.html");
});
