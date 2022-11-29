import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"
import { register } from "../data/user.js"


const renderRegisterTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">Register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`


export function showRegister(ctx) {
    ctx.render(renderRegisterTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({ email, password, ["re-password"]: repass }) {
        if (email == "" || password == "" || repass == "") {
            return alert("Fields cannot be empty!")
        }
        debugger

        if (password !== repass) {
            return alert("Passwords must match!")
        }

        await register(email, password)
        ctx.page.redirect("/catalog")
    }
}