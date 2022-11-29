import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030/'

export async function requester(method, url, data) {

    const options = {
        method,
        headers: {},
    }

    if (data) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }

    try {

        const response = await fetch(host + url, options)

        if (response.status == 204) {
            return response
        }

        const data = await response.json();

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            throw new Error(data.message)
        }

        return data;

    } catch (error) {
        alert(error)
        throw error;
    }
}


const get = requester.bind(null, "get");
const post = requester.bind(null, "post");
const put = requester.bind(null, "put");
const del = requester.bind(null, "delete");


export {
    get,
    post,
    put,
    del as delete
}