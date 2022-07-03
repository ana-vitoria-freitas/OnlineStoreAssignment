var cart = JSON.parse(localStorage.getItem("cart"))
var products = JSON.parse(localStorage.getItem("products")) 

if(cart == null){
    cart = []
}
 
if(products == null){
    products = []
}

Vue.createApp({
    el: "#cart-app",
    data() {
        return {
            cart,
            products
        }
    },
    methods: {
        goToCheckout: () =>{
            location.href = '/checkoutPage';
        },
        removeFromCart: (index) =>{
            cart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(cart))
            location.href = '/cartPage';
        },
        logout: () =>{
            localStorage.removeItem("username")
            location.href = "../homePage"
        }
    }
}).mount("#cart-app");