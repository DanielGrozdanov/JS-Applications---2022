import { page, render } from "./lib.js"
import { logout } from "./src/data/user.js";
import { getUserData } from "./src/util/util.js";
import { editTeamView } from "./src/views/editTeamView.js";
import { myTeamsView } from "./src/views/myTeamsView.js";
import { newTeamView } from "./src/views/newTeamView.js";
import { showHome } from "./src/views/showHome.js";
import { showLoginView } from "./src/views/showLogin.js";
import { showRegisterView } from "./src/views/showRegister.js";
import { showTeams } from "./src/views/showTeams.js";
import { teamDetailsView } from "./src/views/teamDetailsView.js";
const root = document.getElementById("root");

function decoratorFunction(context, next) {
    context.render = (content) => render(content, root)
    updateNav();
    context.updateNav = updateNav;
    next();
}

function onLogout(context) {
    logout();
    updateNav();
    context.page.redirect("/")
}


function updateNav() {
    const user = getUserData();
    if (user) {
        document.querySelectorAll(".user").forEach(item => item.style.display = "block")
        document.querySelectorAll(".guest").forEach(item => item.style.display = "none")
    } else {
        document.querySelectorAll(".user").forEach(item => item.style.display = "none")
        document.querySelectorAll(".guest").forEach(item => item.style.display = "block")
    }
}

page(decoratorFunction)
page("/index.html", "/")
page("/", showHome)
page("/register", showRegisterView)
page("/login", showLoginView)
page("/browse", showTeams)
page("/edit/:id", editTeamView)
page("/my-team", myTeamsView)
page("/details/:id", teamDetailsView)
page("/logout", onLogout)
page("/create", newTeamView)

page.start();

