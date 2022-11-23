import { deleteById, getPetById } from "../api/data.js";
import { getDonations, getOwnDonation, donateToPet } from "../api/donations.js";
import { html, nothing } from "../lib.js"
import { getUserData } from "../util.js";


export async function showDetails(context) {
    let id = context.params.id;
    const user = getUserData();
    const request = [
        getPetById(id),
        getDonations(id)
    ];

    if (user) {
        request.push(getOwnDonation(id, user._id))
    }
    const [pet, donations, hasDonation] = await Promise.all(request);

    const isOwner = user && user._id === pet._ownerId;
    const canDonate = !isOwner && hasDonation == 0;
    context.render(renderDetailsTemplate(pet, donations * 100, user, canDonate, isOwner, onDelete, onDonate))

    async function onDelete() {
        const choice = confirm("Confirm if you want to delete this pet");
        if (choice) {
            await deleteById(id);
            context.page.redirect("/");
        }
    }

    async function onDonate() {
        await donateToPet(id);
        context.page.redirect(`/details/${id}`)
    }

}

const renderDetailsTemplate = (pet, donations, user, canDonate, isOwner, onDelete, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="./${pet.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donations}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${petControls(pet, user, canDonate, isOwner, onDelete, onDonate)}

        </div>
    </div>
</section>`

function petControls(pet, user, canDonate, isOwner, onDelete, onDonate) {

    if (!user) {
        return nothing;
    }

    if (canDonate) {
        return html`
        <div class="actionBtn">
            <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
        </div>`;
    }
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${onDelete}href="javascript:void(0)" class="remove">Delete</a>
        </div>`
    }
}