import { cats } from "./catSeeder.js";
import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById("allCats");

const temp = html`<ul>${cats.map
    (cat => html`<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div id=${cat.id} class="info">
    <button @click=${onClick} class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="100">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`
    )}</ul>`

function onClick(e) {
    if (e.target.textContent === 'Show status code') {
        e.target.parentElement.children[1].style.display = "block"
        e.target.textContent = "Hide status code"
    } else if (e.target.textContent === "Hide status code") {
        e.target.parentElement.children[1].style.display = "none"
        e.target.textContent = "Show status code"
    }
}

render(temp, root)