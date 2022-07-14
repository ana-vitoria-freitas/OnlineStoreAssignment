Vue.createApp({
  el: "#add-product-app",
  data() {
    return {
      nameCompleted: false,
      name: '',
      fun_fact: '',
      ingredients: '',
      nutrition: '',
      recipe_link: '',
      price: '',
      image: ''
    }
  },

  methods: {
    getName: function (value) {
      this.name = value;
    },
    back: () => {
      window.history.go(-1);
    },
    setFlag: function (){
      if(this.name.length > 0){
        this.nameCompleted = true;

      }else{
        this.nameCompleted = false;
      }
    },
    addPicture: function () {
      let photo = document.getElementById("image").files[0];
      var extension = photo.type;

      let formData = new FormData();
      formData.append('foto', photo);

      fetch(`http://localhost:3000/product/upload/${String(this.name).replace(/\s/g,'').toLowerCase()}.${extension.replace(/(.*)\//g, '')}`, { method: "POST", body: formData });
    },
    addProduct: async function () {
      try {

        let resp = await fetch(`http://localhost:3000/product`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            'name': `${this.name}`,
            'fun_fact': `${this.fun_fact}`,
            'ingredients': `${this.ingredients}`,
            'nutrition': `${this.nutrition}`,
            'recipe_link': `${this.recipe_link}`,
            'price': `${this.price}`,
            'username': `${localStorage.getItem("username")}`,
          })
        });

        if (resp.status == 200) {
          window.location.reload();
          console.log("produto inserido");
        } else {
          console.log("produto já existe");
        }

      }
      catch (e) { alert("Error: " + e); }
    },
    logout: () => {
      localStorage.removeItem("username");
      location.href = "../homePage";
    },
  }
}).mount("#add-product-app");