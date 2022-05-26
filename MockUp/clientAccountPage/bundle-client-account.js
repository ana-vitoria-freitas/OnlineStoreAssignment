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