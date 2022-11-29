import { html, page, render } from "../lib.js"
import { getUserData } from "../util.js";
import { logout } from "../data/user.js";
const navHeader = document.querySelector("header");

const navTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
    <div>
        <a href="/catalog">Dashboard</a>
        <a href="/search">Search</a>
    </div>

    <!-- Logged-in users -->
    ${user ? html`<div class="user">
        <a href="/create">Add Pair</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        <!-- Guest users -->
    </div>`: html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>` }


</nav>
`


export function updateNavigation() {
    const user = getUserData();

    render(navTemplate(Boolean(user)), navHeader)
}


async function onLogout() {
    logout();
    updateNavigation();
    page.redirect("/catalog")
}