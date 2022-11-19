import { html } from '../../lib.js'
import { getFurnitureById, updateFurniture } from '../data/furniture.js';

let ctx = null;
let furn = null;
export async function editViews(context) {
    ctx = context;
    const furnitureId = context.params.id;
    const furniture = await getFurnitureById(furnitureId)
    furn = furniture;
    context.render(editViewsTemplate(furniture, onSubmit))

}


const editViewsTemplate = (furniture, handler, stateForm = {}) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit="${onSubmit}" id='${furniture._id}'>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${stateForm.hasMake}" id="new-make" type="text" name="make"
                    .value="${furniture.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${stateForm.hasModel}" id="new-model" type="text" name="model"
                    .value="${furniture.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${stateForm.hasYear}" id="new-year" type="number" name="year"
                    .value="${furniture.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${stateForm.hasDescription}" id="new-description" type="text"
                    name="description" .value="${furniture.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${stateForm.hasPrice}" id="new-price" type="number" name="price"
                    .value="${furniture.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${stateForm.hasImg}" id="new-image" type="text" name="img"
                    .value="${furniture.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control " id="new-material" type="text" name="material"
                    .value="${furniture.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`


async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const id = e.target.id;
    const { make, model, year, description, price, img, material } = Object.fromEntries(new FormData(form));

    let hasError = false;
    const isValid = {
        hasMake: "is-valid",
        hasModel: "is-valid",
        hasYear: "is-valid",
        hasDescription: "is-valid",
        hasPrice: "is-valid",
        hasImg: "is-valid",
    }

    if (!make || make.length <= 3) {
        isValid.hasMake = "is-invalid"
        hasError = true;
    }

    if (!model || model.length <= 3) {
        isValid.hasModel = "is-invalid"
        hasError = true;
    }

    if (!Number(year) || Number(year) < 1950 || Number(year) > 2050) {
        isValid.hasYear = "is-invalid"
        hasError = true;
    }

    if (!description || description.length <= 10) {
        isValid.hasDescription = "is-invalid"
        hasError = true;
    }

    if (!Number(price) || Number(price) <= 0) {
        isValid.hasPrice = "is-invalid"
        hasError = true;
    }

    if (!img || img.length <= 0) {
        isValid.hasImg = "is-invalid"
        hasError = true;
    }

    if (hasError) {
        return ctx.render(editViewsTemplate(furn, onSubmit, isValid))
    }

    await updateFurniture(id, { make, model, year, description, price, img, material })
    ctx.page.redirect("/")
}