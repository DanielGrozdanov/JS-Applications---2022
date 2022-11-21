export function validator(method, body) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, username, password, repass } = body;

    if (method.name === "register") {
        checkEmailAndPassword(email, password, pattern);

        if (!username || username.length < 3) {
            throw new Error("Invalid username");
        }

        if (!repass || repass.length < 3) {
            throw new Error("Invalid password confirmation");
        }
        return true;
    } else {
        checkEmailAndPassword(email, password, pattern)
    }
}

function checkEmailAndPassword(email, password, pattern) {
    if (!email || !pattern.test(email)) {
        throw new Error("Invalid email");
    }

    if (!password || password.length < 3) {
        throw new Error("Invalid password");
    }
}