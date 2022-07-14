Vue.createApp({
    el: "#user-management-app",
    data() {
        return {
            user: {
                id: 0,
                username: null,
                password: null
            },
            index: null,
            list: [{
                id: 1,
                username: "teste",
                password: "1234567",
                role: "user",
            },
            {
                id: 2,
                username: "teste2",
                password: "1234567",
                role: "user",
            },
            {
                id: 3,
                username: "teste3",
                password: "1234567",
                role: "user",
            },
        ]
        }
    },  
    methods: {
        add() {   
            if(this.user.id === 0) {
                this.user.id = this.list.length + 1
                this.list.push(this.user)
                
            } else {
                this.list[this.index] = this.user
            }
            localStorage.setItem('users', JSON.stringify(this.list))
            this.user = {id: 0, username: null, password: null}
        },
        
        remove(item) {
            const idx = this.list.indexOf(item)
            this.list.splice(idx, 1)
            localStorage.setItem('users', JSON.stringify(this.list))
        }, 
        
        edit(item) {
            this.index = this.list.indexOf(item)
            this.contact = Object.assign({}, item);
            localStorage.setItem('users', JSON.stringify(this.list))
        },
        logout: () => {
            localStorage.removeItem("username");
            localStorage.setItem("user_type", 'client')
            window.location.href = '../homePage';
        },  
    }
}).mount("#user-management-app");