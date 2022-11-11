if (sessionStorage.getItem('accessToken')) {
    document.getElementById("guest").style.display = "none";
} else {
    document.getElementById("user").style.display = "none";
}

document.querySelector('form button').addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        let form = e.target.parentElement
        const { email, password, rePass } = Object.fromEntries(new FormData(form));

        if (!email || !password || !rePass) {
            throw new Error("Invalid input!")
        }

        if (password !== rePass) {
            throw new Error("Passwords do not match!")
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: "POST",
            body: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, })
        })

        if (!response.ok) {
            const err = await response.json();
            alert(err)
            throw new Error(err.message);
        }

        const data = await response.json();

        const userDetails = {
            email: data.email,
            id: data._id,
            accessToken: data.accessToken
        };

        sessionStorage.setItem("userData", JSON.stringify(userDetails))
        window.location = "./index.html";
    } catch (e) {
        alert(e.message);
        throw e;
    }
});