let elForm = document.querySelector(".form");
let elEmail = document.querySelector("#email-input");
let elPassword = document.querySelector("#password-input");
elForm.addEventListener("submit", function (evt) {
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
        .then((data) => {
            console.log(data);
            if (data?.token) {
                window.location.replace("../index.html");
                localStorage.setItem("token", data.token);
            } else {
                alert("Login yoki parol xato");
            }
        });
});