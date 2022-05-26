let button = document.getElementById("button-1")

button.addEventListener("click", () =>{
    console.log("entrou")
    if(localStorage.getItem("username") == null){
        location.href = '../loginPage/index.html';
    }

})