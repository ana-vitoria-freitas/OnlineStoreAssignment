Vue.createApp({
    el: "#app",
    data() {
        return {
            name: '',
            username: '',
            password: '',
            cpf: '',
            phone: '',
            email: '',
            address1: '',
            address2: '',
            city: '',
            postal_code: '',
        }
    },
    methods: {
        validate: async function (e) {
            e.preventDefault();

            try {
                let resp = await fetch(`http://localhost:3000/user`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'name': `${this.name}`,
                        'username': `${this.username}`,
                        'password': `${this.password}`,
                        'cpf': `${this.cpf}`,
                        'phone': `${this.phone}`,
                        'email': `${this.email}`,
                        'address1': `${this.address1}`,
                        'address2': `${this.address2}`,
                        'city': `${this.city}`,
                        'postal_code': `${this.postal_code}`,
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