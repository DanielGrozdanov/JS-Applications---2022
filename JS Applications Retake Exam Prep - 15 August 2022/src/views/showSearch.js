import { html, nothing } from "../lib.js"
import { createSubmitHandler } from "../util.js";
import { searchQuery } from "../data/catalog.js";


export function showSearch(ctx) {
    ctx.render(renderShowSearch(false,createSubmitHandler(onSubmit)))

    async function onSubmit({search}) {
        if(search == ""){
            return alert("Field cannot be emplty!")
        }
        const shoes = await searchQuery(search);
        const isLogged = ctx.user;

        ctx.render(renderShowSearch(true, createSubmitHandler(onSubmit), shoes, isLogged))
        debugger
    
    }
}


const renderShowSearch = (submitted,onSubmit, shoes, isLogged) => html`<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSubmit} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
    <ul class="card-wrapper">
            ${submitted ? createShoeTemplate(shoes,isLogged) : nothing}
        </ul>
    </div>
</section>`

const createShoeTemplate = (shoes,isLogged) => html `
${shoes.length == 0 ? html `<h2>There are no results found.</h2>`: shoes.map(shoe => createShoeCard(shoe,isLogged))}`
const createShoeCard = (shoe, isLogged) => html `
<li class="card">
    <img src="${shoe.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    ${isLogged ? html `<a class="details-btn" href="/details/${shoe._id}">Details</a>` : nothing}
</li>`
