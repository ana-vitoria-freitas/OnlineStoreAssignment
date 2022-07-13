// if (!localStorage.getItem("username")){
//     location.href = "../loginPage"
// }

// let link1 = document.getElementById("link-1")

// link1.addEventListener("click", () =>{
//     location.href = "../cartPage/index.html"
// })

// let link2 = document.getElementById("link-2")

// link2.addEventListener("click", () =>{
//     location.href = "../homePage/index.html"
// })

// let link3 = document.getElementById("link-3")

// link3.addEventListener("click", () =>{
//     localStorage.removeItem("username")
//     location.href = "../homePage/index.html"
// })

// let users = JSON.parse(localStorage.getItem("users"))
// let user_data = users.find(u => (u.username == localStorage.getItem("username")))
// document.getElementById("name").value = user_data.name
// document.getElementById("cpf").value = user_data.cpf
// document.getElementById("mobile").value = user_data.mobile
// document.getElementById("email").value = user_data.email
// document.getElementById("address1").value = user_data.address1
// document.getElementById("address2").value = user_data.address2
// document.getElementById("city").value = user_data.city
// document.getElementById("state").value = user_data.state
// document.getElementById("country").value = user_data.country
// document.getElementById("postcode").value = user_data.postcode

// let saveButton = document.getElementById("save-button")

// saveButton.addEventListener("click", () =>{
//     let index = users.findIndex(u => (u.username == localStorage.getItem("username")))
//     user_data.name = document.getElementById("name").value
//     user_data.cpf = document.getElementById("cpf").value
//     user_data.mobile = document.getElementById("mobile").value
//     user_data.email = document.getElementById("email").value
//     user_data.address1 = document.getElementById("address1").value
//     user_data.address2 = document.getElementById("address2").value
//     user_data.city = document.getElementById("city").value
//     user_data.state = document.getElementById("state").value 
//     user_data.country = document.getElementById("country").value 
//     user_data.postcode = document.getElementById("postcode").value

//     users[index] = user_data
//     localStorage.setItem("users", JSON.stringify(users))
//     location.href = "../clientAccountPage"
// })
Vue.createApp({
    el: "#app",
    data() {
        return {
            name: null,
            cpf: null,
            phone: null,
            address1: null,
            address2: null,
            city: null,
            state: null,
            country: null,
            postal_code: null,
            username: null,
        }
    },
    methods: {
        validate: async function (e) {
            console.log(this.name)
            try {
                const $ = ( id ) => {
                    return document.getElementById( id ).value; 
                };

                let resp = await fetch(`http://localhost:3000/user/${localStorage.getItem("username")}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        'name': `${$("name")}`,
                        'cpf': `${$("cpf")}`,
                        'phone': `${$("mobile")}`,
                        'address1': `${$("address1")}`,
                        'address2': `${$("address2")}`,
                        'city': `${$("city")}`,
                        'state': `${$("state")}`,
                        'country': `${$("country")}`,
                        'postal_code': `${$("postcode")}`,
                        'username': `${$("email")}`,
                    })
                });

                if (resp.status == 200) {
                    window.location.reload();
                    console.log("usuario atualizado");
                } else {
                    console.log("usuario já existe");
                }

            }
            catch (e) { alert("Error: " + e); }
        },
        back: () => {
            window.history.go(-1);
        },
        logout: () => {
            localStorage.removeItem("username");
            window.location.href = '../homePage';
        },
        goToCart: () => {
            if (localStorage.getItem("username") == null) {
                location.href = '../loginPage';
            }
            else {
                location.href = '/cartPage';
            }
        },
        goToHome: () => {
            window.location.href = '../homePage';
        }
    },

    mounted: async () => {
                 
        let resp = await fetch(`http://localhost:3000/user/${localStorage.getItem("username")}`, {method: 'GET'});

        resp = await resp.json();


        document.getElementById("name").value = resp.name;
        //this.name = resp.name;
        document.getElementById("cpf").value  = resp.cpf;
        //this.cpf = resp.cpf;
        document.getElementById("mobile").value  = resp.phone;
        //this.phone = resp.phone;
        document.getElementById("address1").value  = resp.address1;
        //this.address1 = resp.address1;
        document.getElementById("address2").value = resp.address2;
        //this.address2 = resp.address2;
        document.getElementById("city").value = resp.city;
        //this.city = resp.city;
        document.getElementById("state").value = resp.state;
        //this.state = resp.state;
        document.getElementById("country").value = resp.country;
        //this.country = resp.country;
        document.getElementById("postcode").value = resp.postal_code;
        //this.postal_code = resp.postal_code;
        document.getElementById("email").value = resp.username
        //this.username = resp.username;
    }
}).mount("#app");