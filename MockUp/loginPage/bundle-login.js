let button1 = document.getElementById("button-1")
let button2 = document.getElementById("button-2")


let input1 = document.getElementById("input-1")

button2.addEventListener("click", () =>{
    let input1Value = input1.value;
    
    if(input1Value == "admin"){
        localStorage.setItem("username", "admin");
    }else if(input1Value == "user"){
        localStorage.setItem("username", "user");
    }

})

button1.addEventListener("click", () =>{
    window.history.back()
})


