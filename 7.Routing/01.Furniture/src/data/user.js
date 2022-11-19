import * as api from './api.js' 


const endPoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': "users/logout"
}

export async function register(body){
   const user = await api.post(endPoints.register, body)
   sessionStorage.setItem("userData",JSON.stringify(user))
   return user;
}

export async function login(body){
    const user = await api.post(endPoints.login, body)
    sessionStorage.setItem("userData", JSON.stringify(user))
    return user;
}

export async function logout(){
    await api.get(endPoints.logout)
    sessionStorage.removeItem('userData')
}