let url ='http://localhost:3030/jsonstore/advanced/dropdown'

export async function get() {
    const response = await fetch(url);
    const data = await response.json()
    return Object.values(data);
}

export async function post(body){
    const response = await fetch(url,header(body));
    const data = response.json();
    return data;

}

function header(body){
    return {
        method: "POST",
        body: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    }
}