import { html, render } from "./node_modules/lit-html/lit-html.js"

const root = document.getElementById("root");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit)

const info = (data) => html`<ul>${data.map(town => html`<li>${town}</li>`)}</ul>`

function onSubmit(e) {
    e.preventDefault();
    let data = Array.from(new FormData(form))[0][1].split(", ");
    render(info(data), root)

}