let link1 = document.getElementById("link-1")

link1.addEventListener("click", () =>{
    location.href = '../clientProductPage/index.html';
})

let link2 = document.getElementById("link-2")

link2.addEventListener("click", () =>{
    if(localStorage.getItem("username") == "admin"){
        location.href = '../sellerAccountPage/index.html';
    }else if (localStorage.getItem("username") == "user"){
        location.href = '../clientProductPage/index.html';
    }else{
        location.href = '../loginPage/index.html';
    }
})