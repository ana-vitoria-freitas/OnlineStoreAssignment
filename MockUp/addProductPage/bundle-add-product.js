Vue.createApp({
  el: "#add-product-app",
  data() {
      return {
      }
  },
  methods: {
      back: () =>{
          window.history.go(-1);
      },
      addProduct: () =>{
        return;
      },
      logout: () => {
        localStorage.removeItem("username");
        location.href = "../homePage";
      },
  }
}).mount("#add-product-app");