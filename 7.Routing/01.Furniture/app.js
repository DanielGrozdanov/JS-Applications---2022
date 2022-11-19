import { page, render } from "./lib.js";
import { logout } from "./src/data/user.js";
import { showCatalog } from "./src/views/catalog.js";
import { showNewFurniture } from "./src/views/create.js";
import { detailsView } from "./src/views/details.js";
import { editViews } from "./src/views/editView.js";
import { showLogin} from "./src/views/login.js";
import { showMyFurniture } from "./src/views/myFurniture.js";
import { showRegister } from "./src/views/register.js";
const root = document.querySelector(".container");

document.getElementById("logoutBtn").addEventListener("click", async () => {
    await logout();
    updateNavigate();
    page.redirect("/")
})

function decorateContext(context, next) {
    updateNavigate();
    context.render = (content) => render(content, root);
    context.updateNavigate = updateNavigate;
    next();
    
}

page(decorateContext)
page("/index.html", "/")
page('/', showCatalog)
page('/catalog', showCatalog)
page('/details/:id', detailsView)
page('/login', showLogin)
page('/register', showRegister)
page("/create", showNewFurniture)
page("/edit/:id", editViews)
page("/my-furniture", showMyFurniture)
page("*", showCatalog)



page.start();
updateNavigate();


function updateNavigate(){
    const token = JSON.parse(sessionStorage.getItem("userData"))
    if(token){
        [...document.getElementById("user").children].forEach(child => child.style.display = "inline-block");
        [...document.getElementById("guest").children].forEach(child => child.style.display = "none");
    }else{
        [...document.getElementById("user").children].forEach(child => child.style.display = "none");
        [...document.getElementById("guest").children].forEach(child => child.style.display = "inline-block");
    }

}