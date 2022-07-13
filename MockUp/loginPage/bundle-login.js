Vue.createApp({
    el: "#app",
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        validate: async function (e) {
            
            try {
                let resp = await fetch("http://localhost:3000/findUser", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'username': `${this.username}`,
                        'password': `${this.password}`,
                    })
                });


                if (resp.status == 200) {
                    localStorage.setItem("username", this.username);
                    window.location.href = '../homePage/index.html';
                    console.log("usuario existe");
                } else {
                    alert("User or password invalid.");
                    console.log("usuario nao existe");
                }

            }
            catch (e) { alert("Error: " + e); }
        },
        back: () =>{
            window.history.go(-1);
        }
    }
}).mount("#app");