import { page, render } from "./lib.js"
import { showHome } from "./src/views/showHome.js";
import { showLoginView } from "./src/views/showLogin.js";
import { showRegisterView } from "./src/views/showRegister.js";
const root = document.getElementById("root");

function decoratorFunction(context, next) {
    context.render = (content) => render(content,root)
    next();
}

page(decoratorFunction)
page("/index.html", "/")
page("/", showHome)
page("/register", showRegisterView)
page("/login", showLoginView)

page.start();