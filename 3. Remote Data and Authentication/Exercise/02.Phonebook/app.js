function attachEvents() {
    document.getElementById('btnLoad').addEventListener("click", getAllPosts)
    document.getElementById("btnCreate").addEventListener('click', createRecordRender)

}

function renderAllPosts(data) {
    let phonebook = document.getElementById("phonebook");
    phonebook.innerHTML = "";

    data.forEach(post => {
        let li = document.createElement("li");
        let button = document.createElement('button');
        button.textContent = "Delete";
        li.textContent = `${post.person}: ${post.phone}`
        li.setAttribute("data-id", post._id)
        button.addEventListener('click', deletePost)
        li.appendChild(button);
        phonebook.appendChild(li);
    })
}

function createRecordRender() {
    let person = document.getElementById('person').value;
    let phone = document.getElementById("phone").value;

    const body = {
        person,
        phone
    }

    person.value = "";
    phone.value = "";
    createRecord(body);
}

function deletePost(e) {
    let li = e.target.parentElement;
    let id = li.getAttribute("data-id");
    deleteRecordById(id);
    li.remove();
}

async function createRecord(body) {
    const url = 'http://localhost:3030/jsonstore/phonebook'

    const headers = getHeader("POST", body)
    await fetch(url, headers);
    getAllPosts();
}


async function deleteRecordById(id) {
    let url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const headers = getHeader("DELETE", null);
    await fetch(url, headers)
}

async function getAllPosts() {
    let response = await fetch('http://localhost:3030/jsonstore/phonebook');
    let data = Object.values(await response.json());

    renderAllPosts(data);
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

attachEvents();