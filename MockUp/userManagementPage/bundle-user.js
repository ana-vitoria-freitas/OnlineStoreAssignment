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
            list: []
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
        
        async remove(item) {
            let users = await fetch(`http://localhost:3000/management/${item.username}`, { method: 'DELETE' });
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
            localStorage.setItem("user_type", 'user')
            window.location.href = '../homePage';
        },  
    },
    async mounted(e){
        let users = await fetch(`http://localhost:3000/management`, { method: 'GET' });
        this.list = await users.json();
        for(let item in this.list){
            console.log(item.username);
        }
        console.log(this.list);
    }
}).mount("#user-management-app");