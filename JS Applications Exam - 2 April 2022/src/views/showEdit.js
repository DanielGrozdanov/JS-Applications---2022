import { html } from "../lib.js"
import { editPet, getPetById } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

export async function showEdit(context) {
    let id = context.params.id;
    const pet = await getPetById(id)
    context.render(renderEditTemplate(pet, createSubmitHandler(onSubmit)))


    async function onSubmit({ name, breed, age, weight, image }, form) {
        if (name == "" || breed == "" || age == "" || weight == "" || image == "") {
            return alert("Fields cannot be empty!");
        }

        await editPet(id, { name, breed, age, weight, image })
        form.reset();
        context.page.redirect(`/details/${id}`)
    }
}


const renderEditTemplate = (pet, onSubmit) => html`

<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age: </label>
                <input name="age" id="age" type="text" .value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight: </label>
                <input name="weight" id="weight" type="text" .value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value="${pet.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`