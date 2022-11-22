import { html, nothing } from "../../lib.js"
import { getAllTeams } from "../data/teams.js"
import { getUserData } from "../util/util.js";

export async function showTeams(context) {
    const teams = await getAllTeams();
    const user = getUserData();
    context.render(renderTeamsTemplate(teams, user))
}

const renderTeamsTemplate = (teams, loggedIn) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class="layout narrow">
        ${loggedIn ? html `<div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>`: nothing}
    </article>

    ${teams.map(team => html `
        <article class="layout">
        <img src="./${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">Members</span>
            <div><a href="/details/${team._id}" class="action">See details</a></div>
        </div>
    </article>`)}
</section>`


