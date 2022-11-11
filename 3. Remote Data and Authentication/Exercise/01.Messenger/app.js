function attachEvents() {
    document.getElementById("refresh").addEventListener("click", getAllMessages);
    document.getElementById("submit").addEventListener('click', renderPostMessage)

}

function renderPostMessage() {
    let author = document.querySelector('input[name="author"]');
    let content = document.querySelector('input[name="content"]');

    let body = {
        author: author.value,
        content: content.value
    }

    postMessage(body);
}

function renderMessage(data) {
    let messages = document.getElementById("messages");
    let msgs = data.map(message => `${message.author}: ${message.content}`).join("\n");
    messages.textContent = msgs;
}

async function getAllMessages() {
    let response = await fetch(`http://localhost:3030/jsonstore/messenger`)
    let data = Object.values(await response.json());
    renderMessage(data);
}


async function postMessage(body) {
    await fetch(`http://localhost:3030/jsonstore/messenger`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    getAllMessages();
}

attachEvents();