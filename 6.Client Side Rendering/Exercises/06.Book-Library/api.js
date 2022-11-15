const url = 'http://localhost:3030/'

async function requester(method, path , data) {

    const options = {
        method,
        headers: {},
    }

    if (data) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url + path , options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
       return response.json();
    } catch (error) {
        alert(error.message);
        throw error;
    }

}

debugger

const get = requester.bind(null, "get");
const post = requester.bind(null, "post")
const put = requester.bind(null, "put")
const del = requester.bind(null, "delete")

export {
    get,
    post,
    put,
    del as delete
}