Vue.createApp({
    el: "#app",
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        validate: async function (e) {
            e.preventDefault();
            
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
                    resp = await resp.json();
                    console.log(resp);
                    localStorage.setItem("username", resp.username);
                    localStorage.setItem("user_type", resp.user_type);
                    window.location.href = '../homePage/index.html';
                } else if(resp.status == 404){
                    alert("User doesn't exist.");
                }else{
                    alert("User or password are incorrect!")
                }

            }
            catch (e) { alert("Error: " + e); }
        },
        back: () =>{
            window.history.go(-1);
        }
    }
}).mount("#app");