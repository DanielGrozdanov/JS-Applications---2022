import { html } from '../../lib.js'
import { getAllFurniture } from '../data/furniture.js';
import { generateFurnitureCard } from '../fragments/common.js';


function catalogTemplate(furnitures) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${furnitures.map(furniure => generateFurnitureCard(furniure))}
    </div>`
}

export async function showCatalog(context) {
    const furnitures = await getAllFurniture();
    context.render(catalogTemplate(furnitures))
}

