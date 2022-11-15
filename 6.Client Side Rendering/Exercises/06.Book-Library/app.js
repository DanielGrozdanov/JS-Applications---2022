import { render } from "./node_modules/lit-html/lit-html.js"
import { sectionDOMFragment } from "./views/originalView.js"
import { getBooks, postBook, putBook, bookIdToDelte } from "./views/booksViews.js"

const root = document.getElementById("bodyId");

function renderMainSection() {
    render(sectionDOMFragment, root)
}

renderMainSection();

const tbody = document.getElementById("table-body");
document.getElementById("loadBooks").addEventListener("click", renderAllBooksSection);


async function renderAllBooksSection() {
    render(await getBooks(), tbody)

    tbody.querySelectorAll("button.edit").forEach(button => button.addEventListener("click", editBook));
    tbody.querySelectorAll("button.delete").forEach(button => button.addEventListener("click", deleteBook));

}


const addForm = document.querySelector('form[id="add-form"]');
addForm.addEventListener("submit", createBook)

async function createBook(e) {
    e.preventDefault();
    const formData = new FormData(addForm);
    let title = formData.get('title');
    let author = formData.get('author')

    if (!title || !author) {
        throw new Error("Invalid input")
    }
    await postBook({ title, author })
    addForm.reset();

    renderAllBooksSection();
}

const editForm = document.querySelector('form[id="edit-form"]');
editForm.addEventListener('submit', saveNewBook)

async function saveNewBook(e) {
    e.preventDefault();

    const formData = new FormData(editForm);

    let id = formData.get('id')
    let title = formData.get('title');
    let author = formData.get('author')

    if (!id || !title || !author) {
        throw new Error("Invalid input")
    }

    await putBook(id, { title, author })
    debugger

    editForm.reset();

    editForm.style.display = "none";
    addForm.style.display = "block";

    renderAllBooksSection();
}

function editBook(e) {
    e.preventDefault();

    editForm.style.display = "block";
    addForm.style.display = "none";

    let bookId = e.target.id;
    let title = e.target.parentElement.parentElement.children[0].textContent;
    let author = e.target.parentElement.parentElement.children[1].textContent;
    let [idInput, bookTitle, bookAuthor] = editForm.querySelectorAll("input");

    idInput.value = bookId;
    bookTitle.value = title;
    bookAuthor.value = author;

}

async function deleteBook(e) {
    await bookIdToDelte(e.target.id)
    renderAllBooksSection();
}

