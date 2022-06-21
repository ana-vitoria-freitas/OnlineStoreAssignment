if (!localStorage.getItem("username")){
    location.href = "../loginPage"
}

let link1 = document.getElementById("link-1")

link1.addEventListener("click", () =>{
    location.href = "../cartPage/index.html"
})

let link2 = document.getElementById("link-2")

link2.addEventListener("click", () =>{
    location.href = "../homePage/index.html"
})

let link3 = document.getElementById("link-3")

link3.addEventListener("click", () =>{
    localStorage.removeItem("username")
    location.href = "../homePage/index.html"
})

let users = JSON.parse(localStorage.getItem("users"))
let user_data = users.find(u => (u.username == localStorage.getItem("username")))
document.getElementById("name").value = user_data.name
document.getElementById("cpf").value = user_data.cpf
document.getElementById("mobile").value = user_data.mobile
document.getElementById("email").value = user_data.email
document.getElementById("address1").value = user_data.address1
document.getElementById("address2").value = user_data.address2
document.getElementById("city").value = user_data.city
document.getElementById("state").value = user_data.state
document.getElementById("country").value = user_data.country
document.getElementById("postcode").value = user_data.postcode

let saveButton = document.getElementById("save-button")

saveButton.addEventListener("click", () =>{
    let index = users.findIndex(u => (u.username == localStorage.getItem("username")))
    user_data.name = document.getElementById("name").value
    user_data.cpf = document.getElementById("cpf").value
    user_data.mobile = document.getElementById("mobile").value
    user_data.email = document.getElementById("email").value
    user_data.address1 = document.getElementById("address1").value
    user_data.address2 = document.getElementById("address2").value
    user_data.city = document.getElementById("city").value
    user_data.state = document.getElementById("state").value 
    user_data.country = document.getElementById("country").value 
    user_data.postcode = document.getElementById("postcode").value

    users[index] = user_data
    localStorage.setItem("users", JSON.stringify(users))
    location.href = "../clientAccountPage"
})
