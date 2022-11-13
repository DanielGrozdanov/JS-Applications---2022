import { createIdea } from "../api/data.js";

const section = document.getElementById("createView");
const form = section.querySelector("form");
form.addEventListener('submit', onSubmit)

let ctx = null
export function showCreateView(context) {
    ctx = context;
    context.showSection(section);
}


async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { title, description, imageURl } = Object.fromEntries(formData);
    await createIdea({ title, description, img: imageURl })
    form.reset();
    ctx.goTo('/catalog')
    
}