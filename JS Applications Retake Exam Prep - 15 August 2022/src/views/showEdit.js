
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import { editItemById, getItemById } from "../data/catalog.js";


const renderEditTemplate = (shoe, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoe.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoe.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoe.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoe.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoe.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoe.value} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const shoe = await getItemById(id);

    ctx.render(renderEditTemplate(shoe, createSubmitHandler(onSubmit)))

    async function onSubmit({ brand, model, imageUrl, release, designer, value }) {
        if (brand == "" || model == "" || imageUrl == "" || release == "" || designer == "" || value == "") {
            return alert("Fields cannot be empty!")
        }

        await editItemById(id, brand, model, imageUrl, release, designer, value);
        ctx.page.redirect(`/details/${id}`)
    }
}