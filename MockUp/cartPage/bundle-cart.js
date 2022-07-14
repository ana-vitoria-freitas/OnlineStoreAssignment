
Vue.createApp({
    el: "#cart-app",
    data() {
        return {
            cart: [],
            products: [],
            cart_products: [],
        }
    },
    methods: {
        goToCheckout: () =>{
            location.href = '/checkoutPage';
        },
        async removeFromCart(product_name) {
            product_name = product_name.replace(/\s/g, '9').toLowerCase()
            console.log(product_name)
            let resp = await fetch(`http://localhost:3000/cart/product/${product_name}/${localStorage.getItem("username")}`, { method: 'PUT' });
            console.log(resp)

            location.href = '/cartPage';
        },
        logout: () => {
            localStorage.removeItem("username");
            localStorage.setItem("user_type", 'user')
            window.location.href = '../homePage';
        },  
        async updateQuantity(quantity, product_name){
            product_name = product_name.replace(/\s/g, '9').toLowerCase()
            let resp = await fetch(`http://localhost:3000/cart/product/${product_name}/${localStorage.getItem("username")}/${quantity}`, { method: 'PUT' });
            console.log(resp)
        },
    },
    async mounted() {
        let resp = await fetch(`http://localhost:3000/cart/${localStorage.getItem("username")}`, {method: 'GET'});

        this.cart = await resp.json();

        let req = await fetch(`http://localhost:3000/product`, { method: 'GET' });
        this.products = await req.json();

        let cart_product_names = this.cart.products.map(function(item) {
            return item['name'];
          });

        this.cart_products = this.products.filter(product => cart_product_names.includes(product.name))

        for(i in this.cart.products){
            index = this.cart_products.findIndex(product => product.name === this.cart.products[i].name)
            if(index != -1){
                this.cart_products[index].quantity = this.cart.products[i].quantity
                let name = String(this.cart_products[index].name)
                name = name.replace(/\s/g, '').toLowerCase()
                this.cart_products[index].image = `./assets/${name}.jpg`
            }
        }
        console.log(this.cart_products)
      }
}).mount("#cart-app");