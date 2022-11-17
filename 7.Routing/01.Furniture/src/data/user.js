import * as api from './api.js' 


const endPoints = {
    'register': 'users/register',
    'login': 'users/login'
}

export async function register(body){
   const user = await api.post(endPoints.register, body)
   sessionStorage.setItem("user",JSON.stringify(user))
}

export async function login(body){
    const user = await api.post(endPoints.login, body)
    sessionStorage.setItem("user", JSON.stringify(user))
}

