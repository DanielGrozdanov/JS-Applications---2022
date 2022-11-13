
import { render } from './template.js';


document.getElementById("navigation").addEventListener("click", onClick)
let username = "Peter";

let items = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
];


const context = {
    username,
    items
}


let views = {
    "home-link": '<h2>Home Page</h2><p>Welcome, %%username%%</p>',
    "catalog-link": '<h2>Catalog Page</h2><ul>%%items%%</ul>',
    "about-link": '<h2>About Page<h2>'
}



function onClick(e) {
    if (e.target.tagName == "A") {
        const view = views[e.target.id];
        if (view !== undefined) {
            render(view, context)
        }
    }
}
