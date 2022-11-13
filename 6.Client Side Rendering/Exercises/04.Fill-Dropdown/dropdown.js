import { html,render} from "./node_modules/lit-html/lit-html.js"
import { get ,post} from "./api.js";
const root = document.getElementById("menu");

async function renderTemplate(){
    let data = await get();

    let listTemplate = html `${data.map(item => html`<option .value=${item._id}>${item.text}</option>`)}`
    render(listTemplate,root)
}

renderTemplate();

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();
    let text = document.getElementById('itemText').value;
    await post({text})

    debugger
    renderTemplate();
}