import { html, nothing } from "../../lib.js"
import { getTeamById, getTeamOwnerMembers } from "../data/teams.js"
import { getUserData } from "../util/util.js";

export async function teamDetailsView(context) {
    let id = context.params.id;
    let team = await getTeamById(id);
    let user = getUserData();
    let ownerId = team._ownerId;
    const isOwner = user._id === ownerId;
    if(isOwner){
       //TODO :  const teamMembers = await getTeamOwnerMembers();
        console.log(teamMembers)
        debugger
    }
    context.render(renderTeamDetails(team, isOwner, user))
}

const renderTeamDetails = (team, isOwner, user) => html`
<section id="team-home">
    <article class="layout">
        <img src="./assets/rocket.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Team Rocket</h2>
            <p>Gotta catch 'em all!</p>
            <span class="details">3 Members</span>
            <div>
                ${isOwner ? html`<a href="/edit/${team._id}" class="action">Edit team</a>` : nothing}
                <a href="#" class="action">Join team</a>
                <a href="#" class="action invert">Leave team</a>
                Membership pending. <a href="#">Cancel request</a>
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                <li>${user.username}</li>
                <li>James ${isOwner ? html`<a href="#" class="tm-control action">Remove from team</a>` : nothing}</li>
                <li>Meowth${isOwner ? html`<a href="#" class="tm-control action">Remove from team</a>` : nothing}</li>
            </ul>
        </div>
        <div class="pad-large">
            ${isOwner ? html`
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
                <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
            </ul>`: nothing}
        </div>
    </article>
</section>`


