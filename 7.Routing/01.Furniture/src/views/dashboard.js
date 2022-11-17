import { html ,repeat} from '../../lib.js'
import { getAllFurniture } from '../data/furniture.js';




const dashBoardTeamplte = (furnitures) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
${repeat(furnitures, furniture => furniture._id, furnitureCard)}
</div>`

const furnitureCard = (furniture) => html `
<div class="col-md-4">
<div class="card text-white bg-primary">
    <div class="card-body">
        <img src="/${furniture.img}"/>
        <p>furniture.description</p>
        <footer>
            <p>Price: <span>${furniture.price} $</span></p>
        </footer>
        <div>
            <a href=”#” class="btn btn-info">Details</a>
        </div>
    </div>
</div>`

export async function showDashboard(context) {
    const furnitures = await getAllFurniture();
    context.render(dashBoardTeamplte(furnitures))
}

