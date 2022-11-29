import { clearUserData, setUserData } from '../util.js'
import * as api from '../api/api.js'

const endPoints = {
    "login": "users/login",
    "register": "users/register"
}

export async function login(email, password) {
    const { _id, accessToken } = await api.post(endPoints.login, { email, password })

    const data = {
        email,
        password,
        _id,
        accessToken
    }

    setUserData(data)

}

export async function register(email, password) {
    const { _id, accessToken } = await api.post(endPoints.register, { email, password })

    const data = {
        email,
        password,
        _id,
        accessToken
    }

    setUserData(data);

}

export function logout() {
    api.get("users/logout");
    clearUserData();
}