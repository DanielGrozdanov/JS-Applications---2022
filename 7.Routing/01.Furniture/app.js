import { page, render } from "./lib.js";
import { showDashboard } from "./src/views/dashboard.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";
const root = document.querySelector(".container");

function decorateContext(context, next, nav) {
    context.render = function (content) {
        render(content, root)
    }
    next();
    updateNaviage();
}

page(decorateContext)
page("/index.html", "/")
page('/', showDashboard)
page('/register', showRegister)
page('/login', showLogin)


page.start();



function updateNaviage(){
    const token = JSON.parse(sessionStorage.getItem("user"))
    if(token){
        [...document.getElementById("user").children].forEach(child => child.style.display = "inline");
        [...document.getElementById("guest").children].forEach(child => child.style.display = "none");
    }else{
        [...document.getElementById("user").children].forEach(child => child.style.display = "none");
        [...document.getElementById("guest").children].forEach(child => child.style.display = "inline");
    }

}