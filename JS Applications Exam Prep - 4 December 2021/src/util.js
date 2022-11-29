export function createSubmitHandler(onSubmit) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data, event.target)
    }
}


export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    return data;
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
    debugger
}

export function clearUserData() {
    sessionStorage.removeItem('userData')
}
