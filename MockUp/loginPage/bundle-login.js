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

                resp = await resp.json();

                if (resp.length > 0) {
                    localStorage.setItem("username", resp[0].username);
                    localStorage.setItem("user_type", resp[0].user_type);
                    window.location.href = '../homePage/index.html';
                    console.log("usuario existe");
                } else {
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