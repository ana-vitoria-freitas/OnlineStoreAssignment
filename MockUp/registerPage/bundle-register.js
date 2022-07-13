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
            password: null,
            email: null,
        }
    },
    methods: {
        validate: async function (e) {

            try {
                let resp = await fetch("http://localhost:3000/user", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'name': `${this.name}`,
                        'cpf': `${this.cpf}`,
                        'phone': `${this.phone}`,
                        'address1': `${this.address1}`,
                        'address2': `${this.address2}`,
                        'city': `${this.city}`,
                        'state': `${this.state}`,
                        'country': `${this.country}`,
                        'postal_code': `${this.postal_code}`,
                        'username': `${this.username}`,
                        'password': `${this.password}`,
                    })
                });


                if (resp.status == 200) {
                    window.location.href = '../loginPage/index.html';
                    alert("User created! You can already login.")
                    console.log("usuario criado");
                } else {
                    alert("This username is already being used. Please choose another one.");
                    console.log("usuario já existe");
                }

            }
            catch (e) { alert("Error: " + e); }
        },
        back: () =>{
            window.history.go(-1);
        }
    }
}).mount("#app");