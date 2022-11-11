if (sessionStorage.getItem('accessToken')) {
    document.getElementById("guest").style.display = "none";
} else {
    document.getElementById("user").style.display = "none";
}


document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault();
    let form = e.target;

    const { email, password } = Object.fromEntries(new FormData(form));

    try {
        if (!email || !password) {
            throw new Error("Invalid input");
        }

        const response = await fetch("http://localhost:3030/users/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }

        const data = await response.json();

        let userDetails = {
            email: data.email,
            id: data._id,
            accessToken: data.accessToken
        }

        sessionStorage.setItem("userData", JSON.stringify(userDetails));
        window.location = './index.html';

    } catch (err) {
        alert(err.message);
        throw err;
    }
})