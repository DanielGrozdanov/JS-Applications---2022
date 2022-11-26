
import { page, render } from "./lib.js"
import { getUserData } from "./util.js";
import { updateNav } from "./views/nav.js";
import { showCatalog } from "./views/showCatalog.js";
import { showCreate } from "./views/showCreate.js";
import { showDetails } from "./views/showDetails.js";
import { showEdit } from "./views/showEdit.js";
import { showHome } from "./views/showHome.js";
import { showLogin } from "./views/showLogin.js";
import { showRegister } from "./views/showRegister.js";
import { showSearch } from "./views/showSearch.js";


const main = document.getElementById('main-content');


updateNav();
page(decorateContext)
page("/", showHome)
page("/home", showHome)
page("/register", showRegister)
page("/login", showLogin)
page("/catalog", showCatalog)
page("/create", showCreate)
page("/details/:id", showDetails)
page("/edit/:id", showEdit)
page("/search", showSearch)
page.start();


function decorateContext(context, next) {
    context.render = renderMain;
    context.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        context.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main)
}

