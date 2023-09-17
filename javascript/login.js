function findElement(element, parent = document) {
    return parent.querySelector(element);
}
const elForm = findElement(".form");
const elEmail = findElement("#email-input");
const elPassword = findElement("#password-input");
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: elEmail.value,
            password: elPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res?.token) {
                window.location.replace("../index.html");
                localStorage.setItem("token", res.token);
            } else {
                alert("Error");
            }
        });
});
