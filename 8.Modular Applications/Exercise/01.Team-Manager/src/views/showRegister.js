import { html } from "../../lib.js"
import {validator} from "../../validator.js"
import { register } from "../data/user.js"
import { createSubmitHandler } from "../util/until.js"

export function showRegisterView(context) {
    context.render(renderRegisterTemplate(createSubmitHandler(onSubmit), false))

    async function onSubmit({ email, username, password , repass}) {
        try {
            validator(register,{ email, username, password, repass });
            if(password != repass){
                throw new Error("Passwords do not match")
            }
            await register({ email, username, password })
            context.page.redirect("/")
        } catch (error) {
            context.render(renderRegisterTemplate(createSubmitHandler(onSubmit), error))
        }
    }
}

const renderRegisterTemplate = (onSubmit,error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            <div style=${error ? " " : "display:none" } class="error">${error.message}.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`