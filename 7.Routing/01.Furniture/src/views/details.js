import { html, page } from '../../lib.js'
import { deleteFurniture, getFurnitureById } from '../data/furniture.js';
let furDetails = null;


const renderDetailsTemp = (furniture) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/${furniture.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price} $</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        ${isOwner() ? html`
        <div>
            <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
            <a @click="${onDelete}" id="${furniture._id}" href=”javascript:void(0)” class="btn btn-red">Delete</a>
        </div>`: ""}
    </div>
</div>
</div>`


export async function detailsView(context) {
    const furnitureId = context.params.id;

    const furniture = await getFurnitureById(furnitureId);
    furDetails = furniture;

    context.render(renderDetailsTemp(furniture))
}


function isOwner() {
    let userData = JSON.parse(sessionStorage.getItem("userData"))
    if (userData === null) {
        return false;
    }

    if (userData._id === furDetails._ownerId) {
        return true;
    }
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.id
    if(confirm("Confirm if you want to delete furniture?")){
        await deleteFurniture(id);
        page.redirect("/")
    }
}