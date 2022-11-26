import { login } from "../api/user.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"


export function showLogin(context) {

    context.render(renderShowLogin(createSubmitHandler(onSubmit)))

    async function onSubmit({ email, password }) {
        if (!email || !password) {
            return alert("Invalid credentials")
        }

        await login(email, password)
        context.updateNav();
        context.page.redirect("/home")
    }
}


const renderShowLogin = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`