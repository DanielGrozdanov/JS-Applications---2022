import { html, nothing } from "../../lib.js"
import { validator } from "../../validator.js"
import { createNewTeam, teamMemberRequest } from "../data/teams.js"
import { createSubmitHandler } from "../util/util.js"

export function newTeamView(context) {

    context.render(renderNewTeam(createSubmitHandler(onSubmit)))

    async function onSubmit({ name, logoUrl, description }) {
        try {
            debugger
            validator(createNewTeam, { name, logoUrl, description })
            const res = await createNewTeam({ name, logoUrl, description })
            const addMember = teamMemberRequest(res._id);
            context.page.redirect(`/details/${res._id}`)
        } catch (error) {
            context.render(renderNewTeam(createSubmitHandler(onSubmit), error))
        }
    }
}

const renderNewTeam = (onSubmit, error) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit="${onSubmit}" id="create-form" class="main-form pad-large">
            ${error ? html `<div class="error">${error.message}</div>`: nothing}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`