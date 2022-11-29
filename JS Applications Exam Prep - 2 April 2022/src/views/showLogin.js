import { login } from "../api/user.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"


export function showLogin(context) {

    context.render(renderShowLoginTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({ email, password }) {
        if (email == "" || password == "") {
            return alert("All fields are required!")
        }

        await login( email, password )
        context.page.redirect("/")
    }
}


const renderShowLoginTemplate = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit} class="loginForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`