import { html } from "../../lib.js"
import { validator } from "../../validator.js"
import { createSubmitHandler } from "../util/util.js"
import { login } from "../data/user.js";

export function showLoginView(context) {
    context.render(renderLoginTemplate(createSubmitHandler(onSubmit), false))

    async function onSubmit({ email, password }) {
        try {
            validator(login, { email, password });
            await login({ email, password })
            context.updateNav();
            context.page.redirect("/")
        } catch (error) {
            context.render(renderLoginTemplate(createSubmitHandler(onSubmit), error))
        }
    }
}


const renderLoginTemplate = (onSubmit,error) => html`

<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
            <div style=${error ? " " : "display:none" } class="error">${error.message}.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`
