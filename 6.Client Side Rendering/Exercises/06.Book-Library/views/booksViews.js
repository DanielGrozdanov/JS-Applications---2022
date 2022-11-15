import { html } from '../node_modules/lit-html/lit-html.js';
import { loadBooks, createNewBook , putEditedBook , deleteBook} from "../data.js";

export async function getBooks() {
    const data = await loadBooks();
    const books = Object.entries(data);

    let bookFragment = document.createDocumentFragment();

    bookFragment = html`${books.map(book => html
        `<tr id=${book[0]}>
        <td>${book[1].title}</td>
        <td>${book[1].author}</td>
        <td>
            <button class="edit" id=${book[0]}>Edit</button>
            <button class="delete" id=${book[0]}>Delete</button>
        </td>
    </tr>`)}`

    return bookFragment;
}

export async function postBook(body) {
    await createNewBook(body)
}

export async function putBook(id, body) {
    await putEditedBook(id, body);
}

export async function bookIdToDelte(id){
    await deleteBook(id);
}