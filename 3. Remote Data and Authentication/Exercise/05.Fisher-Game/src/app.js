document.getElementById("logout").addEventListener("click", onLogout)
document.querySelector(".load").addEventListener("click", loadAllCatches)
document.getElementById("addForm").addEventListener('submit', addCatch)
let catches = document.getElementById("catches");
catches.addEventListener("click", checkEvent)
catches.innerHTML = '';
let url = 'http://localhost:3030/data/catches'

let userDetails = null;

window.addEventListener("DOMContentLoaded", () => {
    userDetails = JSON.parse(sessionStorage.getItem("userData"));


    if (userDetails) {
        document.getElementById("guest").style.display = "none";
        document.querySelector("p span").innerHTML = userDetails.email;
        document.querySelector("form button").disabled = false;
        
    } else {
        document.getElementById("guest").style.display = "inline";
        document.getElementById("user").style.display = "none";
        document.querySelector("p span").innerHTML = "guest";
        document.querySelector("form button").disabled = true;
    }

});

async function catchUpdate(e) {
    const catchid = e.target.id;
    const catchData = Object.fromEntries(
    Array.from(e.target.parentNode.children)
      .filter((el) => el.nodeName == 'INPUT')
      .map((el) => [el.className, el.value])
  );
    await fetch(`${url}/${catchid}`, {
        method: "PUT",
        headers: {
            "X-Authorization": userDetails.accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catchData)
    })
}

async function catchDelete(e) {
    const catchid = e.target.id;

    await fetch(`${url}/${catchid}`, {
        method: "DELETE",
        headers: {
            "X-Authorization": userDetails.accessToken
        }
    });
}

function checkEvent(e) {
    if (e.target.tagName !== "BUTTON") {
        return;
    }

    e.target.className == 'update' ? catchUpdate(e):catchDelete(e);
}
async function addCatch(e) {
    e.preventDefault();
    let values = e.target;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);


    if (Array.from(formData.values()).some((val) => val == '')) {
        alert('All fields need to be populated');
        throw new Error("All fields need to be populated")
    }


    try {
        const response = await fetch('http://localhost:3030/data/catches', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userDetails.accessToken
            },

            body: JSON.stringify(data)
        })

        let newCatch = await response.json();
        document.getElementById("catches").appendChild(renderLoadCatches(newCatch))
        Object.values(values).filter((el) => el.nodeName == "INPUT").forEach(el => el.value = '');
    } catch (err) {
        alert(err.message);
        throw err
    }

}
async function onLogout() {
    await fetch('http://localhost:3030/users/logout', {
        method: "POST",
        headers: {
            "X-Authorization": userDetails.accessToken
        },
    });
    sessionStorage.clear();
    window.location = './index.html';
}

async function loadAllCatches() {
    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();
    let inf = catches.replaceChildren(...data.map(renderLoadCatches))
    console.log(inf);
    debugger
}


function renderLoadCatches(data) {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add('catches')
    
    const div =
        e('div', { className: 'catch' },
            e('label', {}, 'Angler'),
            e('input', { type: "text", className: "angler", value: data.angler }),
            e('label', {}, 'Weight'),
            e('input', { type: "text", className: "weight", value: data.weight }),
            e('label', {}, 'Species'),
            e('input', { type: "text", className: "species", value: data.species }),
            e('label', {}, "Location"),
            e('input', { type: "text", className: "location", value: data.location }),
            e('label', {}, "Bait"),
            e('input', { type: "text", className: "bait", value: data.bait }),
            e('label', {}, "Capture Time"),
            e('input', { type: "number", className: "captureTime", value: data.captureTime }),
            e('button', { className: "update", id: data._id }, "Update"),
            e('button', { className: "delete", id: data._id }, "Delete"));
    mainDiv.appendChild(div);
    mainDiv.dataset.id = data._id;

    const isOwner = userDetails && data._ownerId === userDetails.id;
    if (!isOwner) {
      div.querySelector('.angler').setAttribute('disabled', true);
      div.querySelector('.weight').setAttribute('disabled', true);
      div.querySelector('.species').setAttribute('disabled', true);
      div.querySelector('.location').setAttribute('disabled', true);
      div.querySelector('.bait').setAttribute('disabled', true);
      div.querySelector('.update').setAttribute('disabled', true);
      div.querySelector('.delete').setAttribute('disabled', true);
    }
    return mainDiv;
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach((e) => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}