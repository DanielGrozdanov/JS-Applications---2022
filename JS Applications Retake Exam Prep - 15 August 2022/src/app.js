import { page, render } from "./lib.js"
import { updateNavigation } from "./views/navigation.js";
import { showCatalog } from "./views/showCatalog.js";
import { showCreate } from "./views/showCreate.js";
import { showDetails } from "./views/showDetails.js";
import { showEdit } from "./views/showEdit.js";
import { showHome } from "./views/showHome.js";
import { showLogin } from "./views/showLogin.js";
import { showRegister } from "./views/showRegister.js";
import { showSearch } from "./views/showSearch.js";
import { getUserData } from "./util.js";
const root = document.getElementById("content");


function decorateMiddleware(ctx, next) {
    ctx.updateNavigation = updateNavigation;
    ctx.render = (content) => render(content, root);
    const user = getUserData();
    if (user) {
        ctx.user = user;
    }
    next();
}


updateNavigation();
page(decorateMiddleware)
page("/", showHome);
page("/home", showHome)
page("/register", showRegister)
page("/login", showLogin)
page("/catalog", showCatalog)
page("/create", showCreate)
page("/details/:id", showDetails)
page("/edit/:id", showEdit)
page('/search', showSearch)
page.start();
