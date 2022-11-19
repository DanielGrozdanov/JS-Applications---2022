import { html, page } from '../../lib.js'
import { login } from '../data/user.js';


const loginTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`


async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    debugger
    const { email, password } = Object.fromEntries(new FormData(form))

    if (!email || !password) {
        throw new Error("Invalid inputs!")
    }
    await login({ email, password })
    page.redirect('/');

}

export function showLogin(context) {
    context.render(loginTemplate())
}