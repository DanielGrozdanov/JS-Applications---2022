import { logout } from "./api/user.js";
import { page, render } from "./lib.js"
import { getUserData } from "./util.js";
import { showCreate } from "./views/showCreate.js";
import { showDashboard } from "./views/showDashboard.js";
import { showDetails } from "./views/showDetails.js";
import { showEdit } from "./views/showEdit.js";
import { showHome } from "./views/showHome.js";
import { showLogin } from "./views/showLogin.js";
import { showRegister } from "./views/showRegister.js";
const main = document.getElementById("content");

page(decorateContext)
page('/index.html', "/")
page("/", showHome);
page("/dashboard", showDashboard);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
page("/create", showCreate);
page("/login", showLogin);
page("/register", showRegister);
page("/logout", onLogout);

updateNav()
page.start();

function decorateContext(context, next) {
    context.render = renderMain;
    context.updateNav = updateNav;
    next();

}

function renderMain(content) {
    render(content, main)
}

function onLogout() {
    logout();
    page.redirect("/");
}

function updateNav() {
    const user = getUserData();
    if (user) {
        document.querySelectorAll("a.user").forEach(el => el.style.display = "block");
        document.querySelectorAll("a.guest").forEach(el => el.style.display = "none");
    } else {
        document.querySelectorAll("a.user").forEach(el => el.style.display = "none");
        document.querySelectorAll("a.guest").forEach(el => el.style.display = "block");
    }
}