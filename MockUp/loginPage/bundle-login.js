let button1 = document.getElementById("button-1")
let button2 = document.getElementById("button-2")

button1.addEventListener("click", () =>{
    window.history.back()
})

button2.addEventListener("click", () =>{
    if(localStorage.getItem("username") != null){
        window.history.back()

    }
})
