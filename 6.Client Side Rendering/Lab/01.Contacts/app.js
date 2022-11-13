import { contacts as data } from './contacts.js';
import { html, render, nothing } from './node_modules/lit-html/lit-html.js';

let contacts = data.map(c => Object.assign({}, c, { active: false }));

const root = document.getElementById("contacts");

let contactCards = (contact) => html `

<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${contact.name}</h2>
    <button id=${contact.id} class="detailsBtn">Details</button>
    ${contact.active
        ? html`<div class="details" >
    <p>Phone number: ${contact.phoneNumber}</p>
    <p>Email: ${contact.email}</p>
    </div>`: nothing}

</div>
</div>`

root.addEventListener("click", toggleDetails)

update();


function toggleDetails(e) {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
        const id = e.target.id;
        const contact = contacts.find(c => c.id == id);
        contact.active = !contact.active
        update();
    }
    
}


function update(){
    render(contacts.map(contactCards), root)
}