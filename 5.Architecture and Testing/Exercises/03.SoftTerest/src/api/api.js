const host = 'http://localhost:3030/';

async function requester(method, url, data) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const option = {
        method,
        headers: {},

    }

    if (data) {
        option.headers["Content-Type"] = "application/json"
        option.body = JSON.stringify(data)
    }

    if (user) {
        const token = user.accessToken;
        option.headers["X-Authorization"] = token
    }

    try {
        const respose = await fetch(host + url, option);

        if (!respose.ok) {
            if (respose.status === 403) {
                sessionStorage.removeItem("user");
            }
            const error = await respose.json();
            throw new Error(error.message)
        }

        if (respose.status === 204) {
            return respose
        } else {
            return respose.json()
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }


}

const get = requester.bind(null, "get")
const post = requester.bind(null, "post")
const put = requester.bind(null, "put")
const del = requester.bind(null, "delete")

export {
    get,
    post,
    put,
    del as delete
}