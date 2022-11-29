import { html } from "../lib.js"
import { getAllItems } from "../data/catalog.js";


const renderCatalogTemplate = (shoes) => html`

<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        ${shoes.length == 0 ? html`<h2>There are no items added yet.</h2>` : shoes.map(shoe => createShoeCard(shoe))}
    </ul>
    <!-- Display an h2 if there are no posts -->
</section>`

const createShoeCard = (shoe) => html`
<li class="card">
    <img src="${shoe.imageUrl}" alt="eminem" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>

`
export async function showCatalog(ctx) {
    const shoes = await getAllItems();
    ctx.render(renderCatalogTemplate(shoes));
}