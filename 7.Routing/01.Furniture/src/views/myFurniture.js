import { html, page } from '../../lib.js'
import { getMyFurniture } from "../data/furniture.js";
import { generateFurnitureCard } from '../fragments/common.js';


export async function showMyFurniture(context) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData._id;
    const furnitures = await getMyFurniture(id);
    context.render(getMyFurnitureTemplate(furnitures))

}

const getMyFurnitureTemplate = (furnitures) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${furnitures.map(furniture => generateFurnitureCard(furniture))}
</div>`