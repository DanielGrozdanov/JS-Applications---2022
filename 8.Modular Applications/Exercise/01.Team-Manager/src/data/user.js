import { setUserData } from "../util/until.js";
import * as api from "./api.js";

const endPoints = {
    "register": 'users/register',
    "login": 'users/login',
    'logout': 'users/logout'
}
export async function register({ email, username, password }) {
    const content = await api.post(endPoints.register, { email, username, password })
    setUserData(content)
    return content;
}

export async function login({ email, password }) {
    const content = await api.post(endPoints.login, { email, password })
    setUserData(content)
    return content;
}





// Register User (POST): http://localhost:3030/users/register
// Login User (POST): http://localhost:3030/users/login
// Logout User (GET): http://localhost:3030/users/logout
