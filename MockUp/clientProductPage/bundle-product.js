let button = document.getElementById("button-1")
let link1 = document.getElementById("link-1")

link1.addEventListener("click", () =>{
    location.href = '../homePage/index.html';
})

let link2 = document.getElementById("link-2")

link2.addEventListener("click", () =>{
    if(localStorage.getItem("username") == null){
        location.href = '../loginPage/index.html';
    }else{
        location.href = '../clientAccountPage/index.html';
    }
})

button.addEventListener("click", () =>{
    if(localStorage.getItem("username") == null){
        location.href = '../loginPage/index.html';
    }

})