export function validator(method, body) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, username, password, repass, name, logoUrl, description } = body;

    if (method.name === "register") {
        checkEmailAndPassword(email, password, pattern);

        if (!username || username.length < 3) {
            throw new Error("Invalid username");
        }

        if (!repass || repass.length < 3) {
            throw new Error("Invalid password confirmation");
        }
    } else if (method.name === "login") {
        checkEmailAndPassword(email, password, pattern);
    } else {
        checkNewTeamInfo(name, logoUrl, description)
    }

    return true;
}

function checkEmailAndPassword(email, password, pattern) {
    if (!email || !pattern.test(email)) {
        throw new Error("Invalid email");
    }

    if (!password || password.length < 3) {
        throw new Error("Invalid password");
    }
}

function checkNewTeamInfo(name, logoUrl, description) {
    if (!name || name.length < 4) {
        throw new Error("Invalid Team Name")
    }

    if (!logoUrl) {
        throw new Error("Invalid Logo URL")
    }

    if (!description || description.length < 10) {
        throw new Error("Invalid description")
    }
}