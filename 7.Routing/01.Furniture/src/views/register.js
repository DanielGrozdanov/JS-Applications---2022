import { html,page } from '../../lib.js'
import { register } from '../data/user.js';


const registerTemplate = () => html`   
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>
`

async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const { email, password, rePass } = Object.fromEntries(new FormData(form))

    if (!email || !password || !rePass) {
        throw new Error("Invalid input fields")
    }

    if (rePass != password) {
        throw new Error("Passwords do not match!")
    }
    await register({ email, password })
    page.redirect("/")
}

export function showRegister(context) {
    context.render(registerTemplate())
}