import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"
import { login } from "../data/user.js"


const renderLoginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`


export function showLogin(ctx) {
    ctx.render(renderLoginTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({ email, password }) {
        if (email == "" || password == "") {
            return alert("Fields cannot be empty!")
        }

        await login(email,password)
        ctx.updateNavigation();
        ctx.page.redirect("/catalog")
    }
}