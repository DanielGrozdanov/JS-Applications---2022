import { html, page, render } from '../../lib.js'
import { createNewFurniture } from '../data/furniture.js'

let ctx = null;
export async function showNewFurniture(context) {
    ctx = context;
    context.render(createNewFurnitureTemp(onSubmit))
}


const createNewFurnitureTemp = (handler, stateForm = {}) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit="${onSubmit}">
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${stateForm.hasMake}" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${stateForm.hasModel}" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${stateForm.hasYear}" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${stateForm.hasDescription}" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${stateForm.hasPrice}" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${stateForm.hasImg}" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control " id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`
debugger

async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
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
        return ctx.render(createNewFurnitureTemp(onSubmit, isValid))
    }

    await createNewFurniture({ make, model, year, description, price, img, material })
    page.redirect("/")
}