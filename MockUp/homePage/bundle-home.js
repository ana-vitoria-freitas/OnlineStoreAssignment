const vueApp = new Vue({
  el: "#home_id",
  data() {
    return{
      products: [],
      pictures: [],
      isMounted: false,
      user_admin: (localStorage.getItem("username") == "admin"),
    }
  },
  methods: {
    goToAccount: function () {
      {
        if (localStorage.getItem("username") == "user" || localStorage.getItem("username") == "admin") {
          location.href = '../clientAccountPage';
        } else {
          location.href = '../loginPage';
        }
      }
    }
  },
  async mounted () {
    let products = await fetch(`http://localhost:3000/product/${localStorage.getItem("username")}`, {method: 'GET'});

    products = await products.json();
    this.products = products;

    for(let i = 0; i < this.products.length; i++){
      let name = String(this.products[i].name);
      name = name.replace(/\s/g,'').toLowerCase();
      this.pictures.push(`./assets/${name}.jpg`);
    }

    this.isMounted = true;
  }
});