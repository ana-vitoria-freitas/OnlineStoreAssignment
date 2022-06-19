let link1 = document.getElementById("link-1")

link1.addEventListener("click", () =>{
    console.log('aqui')
    location.href = '../clientProductPage';
})

let link2 = document.getElementById("link-2")

link2.addEventListener("click", () =>{
    if(localStorage.getItem("username") == "admin"){
        location.href = '../sellerAccountPage/index.html';
    }else if (localStorage.getItem("username") == "user"){
        location.href = '../clientAccountPage/index.html';
    }else{
        location.href = '../loginPage/index.html';
    }
})

let button1 = document.getElementById("button-1")

button1.addEventListener("click", () =>{
    console.log('aqui')
    location.href = '/cartPage';
})